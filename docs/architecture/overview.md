This project operates using 4 key languages/libraries.
1.TypeScript
2.React
3.WebAssembly
4.C++

The general procedure for each simulation is as follows:

Step 1, User Interaction & Parameterization
User changes parameters of simulation by the user literally clicking and dragging on objects, creating new objects, or updating properties of (an) object(s) with sliders, updating the simulator in real-time.


Step 2, C++ Physics Engine (C++ -> WebAssembly):
React passes parameters to C++ physics engine (compiled to WebAssembly) at each time step and performs calculations to determine a new complete state of simulation containing all derived quantities.

Step 3, Visualization & State Management
React listens to C++ output and updates all related graphs and visualizations to reflect new state, unless React receives a signla to stop, in which case it stops passing in parameters to C++ and the User is given a message detailing why the simulation stopped.

Steps 2 and 3 cycle at desired frame rate, adding in Step 1 everytime user changes parameters, until React stops the simulation
