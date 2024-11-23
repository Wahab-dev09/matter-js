# Matter JS Project
<br>

<p align="left">
 <img src="https://github.com/user-attachments/assets/6d2fc270-0079-4b85-a8bf-2e13e17005a7" alt="Weather Screenshot 4" width="40%" />
 <img src="https://github.com/user-attachments/assets/3156e0f2-5c2b-465c-8f32-bd3c01301e78" alt="Weather Screenshot 4" width="40%" />
</p>


## Overview

The Matter JS Project is a React-based simulation leveraging the Matter.js 2D physics engine to create an interactive, dynamic environment. The project showcases responsive ball physics, customizable aesthetics, and overlayed text rendered using Matter.js's canvas manipulation capabilities.

## Features

- **Dynamic Ball Simulation:** 
  - Balls are generated dynamically with different colors and realistic physics properties such as friction and restitution.
  - The number of balls adapts based on screen size (mobile, tablet, or desktop).

- **Interactive Physics:**
  - Users can interact with the balls using mouse controls via Matter.js's `MouseConstraint`.

- **Responsive Design:** 
  - Adjusts the simulation dynamically based on viewport size using a custom hook, `useResponsiveJSX`.

- **Customizable Aesthetic:**
  - Balls have dynamic colors, and the canvas features a minimalistic background with gradient effects.

- **Overlayed Text:**
  - Custom text is rendered dynamically on the canvas using Matter.js’s `afterRender` event.

## Components

### `MatterBoilerplate.jsx`
The core component responsible for initializing and managing the Matter.js engine and rendering the simulation.

- **Features:**
  - Sets up the Matter.js engine, renderer, and physics bodies.
  - Generates dynamic balls and manages ground and wall collision boundaries.
  - Implements mouse control for interactivity.
  - Adjusts canvas size and object positions on window resize.


### `useResponsiveJSX.js`
A custom React hook to provide breakpoints for responsive design.

- **Features:**
  - Returns breakpoint-specific values for small (mobile), medium (tablet), and large (desktop) screens.
  - Dynamically updates based on viewport size to optimize the simulation.


## Technologies Used

- **React:** For building the user interface and managing components.
- **Matter.js:** For the 2D physics engine driving the simulation.
- **CSS:** For basic styling of the container and elements.
