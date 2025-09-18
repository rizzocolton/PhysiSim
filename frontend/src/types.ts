export interface vector{
    x:number, //component in the i hat direction of any vector
    y:number //component in the j hat direction of any vector
}

//Shared properties of all physics objects that are not static
export interface physicsObject{
    pos:vector, //position vector pointing to an objects position on screen, origin at  the intersection of theleft side of the screeen and floor.
    vel:vector, //velocity vector indicating an objects direction of travel and speed
    acc:vector, //acceleration vector indicating an objects change in velocity in each direction
}

/* KINEMATICS */

export interface kinematicsObject extends physicsObject{
    r: number //the radius of an object, helpful for positioning the object accurately on screen
}

export interface kinematicsState{
    simObject: kinematicsObject, //the object being rendered
    gravity: number //magnitude of the vertical acceleration an object experiences
    time: number //the timing of the simulation
    shouldContinue: boolean //indicates whether or not the simulation should be running/is in a valid state (can be set to false through the sim being paused or hte object hitting the floor)
}

/* SIMULATION OUTLINE */

export interface simulationBounds{
    sF: number, //The scaling factor by which meters in the sim are converted to pixels
    widthP: number, //however wide the screen of the simulator is in pixels (divide by sF to get meters)
    heightP: number, //however tall the screen of the simulator is in pixels (divide by sF to get meters)
    floorHeight: number, //the height of the floor of the simulator in pixels (divide by sF to get meters)
    //The workable vertical space of an object is always height-floorHeight
}

export interface simulationConfig{
    initialState:kinematicsState,
    timeStep:number,
    frameRate:number
}
export interface kinematicsWASM{
    initializeSimulation(configJson:string):boolean, //returns whether or not simulation initialization was successful
    stepSimulation(dt:number):string //returns JSON
}
