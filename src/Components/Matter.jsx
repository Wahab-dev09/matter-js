import React, { useEffect, useRef } from 'react';
import Matter, { Bodies, Composite } from 'matter-js';
import { useResponsiveJSX } from './useResponsiveJSX';

const MatterBoilerplate = () => {
  const sceneRef = useRef(null);
  const thincness = 60; // Thickness of the ground
  const breakpoint = useResponsiveJSX([600, 900]); // Mobile: 0, Tablet: 1, PC: 2

  useEffect(() => {
    if (!sceneRef.current) return;


    const engine = Matter.Engine.create();


    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        background: '#131313',
        wireframes: false,
      },
    });
    // Add dynamic number of balls
    const colors = ['#e9d79c', '#a7ffc4', '#e9a59c'];
    const ballCount = breakpoint === 0 ? 30 : breakpoint === 1 ? 50 : 80; // Adjust ball count
    for (let i = 0; i < ballCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const circle = Bodies.circle(
        Math.random() * sceneRef.current.clientWidth, // Random x-position
        Math.random() * sceneRef.current.clientHeight / 2, // Random y-position
        30,
        {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 0.8,
          render: {
            fillStyle: randomColor,
          },
        }
      );
      Composite.add(engine.world, circle);
    }

    // Create the ground and walls
    const ground = Bodies.rectangle(
      sceneRef.current.clientWidth / 2,
      sceneRef.current.clientHeight + thincness / 2,
      27000,
      thincness,
      { isStatic: true }
    );
    const Leftwall = Bodies.rectangle(
      0 - thincness / 2,
      sceneRef.current.clientHeight / 2,
      thincness,
      sceneRef.current.clientHeight * 5,
      { isStatic: true }
    );
    const Rightwall = Bodies.rectangle(
      sceneRef.current.clientWidth + thincness / 2,
      sceneRef.current.clientHeight / 2,
      thincness,
      sceneRef.current.clientHeight * 5,
      { isStatic: true }
    );

    // Add bodies to the world
    Composite.add(engine.world, [ground, Leftwall, Rightwall]);

    // Add mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraints = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(engine.world, mouseConstraints);

    // Render custom text
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;

      // Set text styles
      ctx.fillStyle = '#f8f8f8';
      ctx.font = 'bold 44px Outfit';

      // Text for the main line
      const text1 = 'Matter JS';
      const text1Width = ctx.measureText(text1).width;

      // Center the first line of text
      const x1 = (sceneRef.current.clientWidth - text1Width) / 2;
      const y1 = sceneRef.current.clientHeight / 2 - 20;

      // Draw the first line
      ctx.fillText(text1, x1, y1);

      // Add the second line
      const text2 = 'Explore the World of Physics!';
      ctx.font = '400 20px Outfit';
      const text2Width = ctx.measureText(text2).width;

      // Center the second line
      const x2 = (sceneRef.current.clientWidth - text2Width) / 2;
      const y2 = y1 + 50;

      // Draw the second line
      ctx.fillText(text2, x2, y2);
    });

    // Run the renderer
    Matter.Render.run(render);

    // Create and run the runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Resize handler to update the canvas size and reposition the ground
    const handleResize = () => {
      render.canvas.width = sceneRef.current.clientWidth;
      render.canvas.height = sceneRef.current.clientHeight;

      Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
          sceneRef.current.clientWidth / 2,
          sceneRef.current.clientHeight + thincness / 2
        )
      );
      Matter.Body.setPosition(
        Rightwall,
        Matter.Vector.create(
          sceneRef.current.clientWidth + thincness / 2,
          sceneRef.current.clientHeight / 2
        )
      );
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [breakpoint]);

  return <div className="screen" ref={sceneRef} />;
};

export default MatterBoilerplate;
