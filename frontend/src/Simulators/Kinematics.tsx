import {useEffect,useState, useRef, useCallback} from 'react';
import Header from '../Header/Header';
import styles from './Simulator.module.css';

function Kinematics(){
  //reference for react to modify component once its mounted
  const canvasRef=useRef(null);
  const animationRef=useRef(null);

  const [wasmReady, setWasmReady] = useState(false);
  const [running, setRunning] = useState(false);

  //state object, contains simulation starting parameters
  const [state,setState]=useState({
    x:0,y:1,vx:0,vy:0,ax:0,ay:0,shouldContinue:true
  });
  
  //wasm setup, runs when mounted, ai generated because every other setup was giving errors
    useEffect(()=>{
    // Check if script already exists
    if (document.querySelector('script[src="/kinematics.js"]')) {
      if ((window as any).wasmModule) {
        setWasmReady(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = '/kinematics.js';
    script.onload = () => {
      // Try both patterns
      if ((window as any).Module) {
        const moduleOrPromise = (window as any).Module;
        
        if (typeof moduleOrPromise === 'function') {
          moduleOrPromise().then((module: any) => {
            console.log("Module keys:", Object.keys(module));
            (window as any).wasmModule = module;
            setWasmReady(true);
          });
        } else {
          // Module is already ready
          console.log("Module keys:", Object.keys(moduleOrPromise));
          (window as any).wasmModule = moduleOrPromise;
          setWasmReady(true);
        }
      }
    };
    document.head.appendChild(script);
  },[]);

  //canvas setup, runs when mounted
  useEffect(()=>{
    const canvas=canvasRef.current;
    //if canvas isn't setup yet, just exit function
    if(!canvas) return;
    canvas.width=1000;
    canvas.height=500;
    //setup initial scene
    render();
  },[]);

  //canvas draw call, runs whenever state changes
  useEffect(()=>{
    render();
  },[state]);

  //simulation loop, runs while dependencies are true
  const simulationLoop=useCallback(()=>{
    console.log("in sim loop");

    const wasm=(window as any).wasmModule;

    //call c++ to compute next state
    console.log("calling C++ in simulation loop!");
    const newState=wasm.stepSimulation(1/120);

    //continue loop if valid
    console.log(newState.shouldContinue);
    if(newState.shouldContinue){
      console.log("new state was valid");
      setState(newState);
      setTimeout(()=>{
        animationRef.current=requestAnimationFrame(simulationLoop)
      },1000/120)
    }else{
      setRunning(false);
      console.log("Simulation stopped");
    }
  },[wasmReady,running]);

  //start simulation button handler
  const startSimulation=()=>{
    if(!wasmReady)return;

    const wasm=(window as any).wasmModule;

    //initialize c++ with current params
    console.log("calling to C++!");
    wasm.initializeSimulation(state.x,state.y,state.vx,state.vy,state.ay);

    //set simulation loop off
    setRunning(true);
    simulationLoop();
  };

  const stopSimulation=()=>{
    setRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  function render(){
    const canvas=canvasRef.current;
    if(!canvas) return;
    
    const ctx=canvas.getContext('2d');

    //canvas reset
    ctx.fillStyle='white';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    

    //draw object
    ctx.beginPath();
    let floorHeight=100;
    let r=10;
    ctx.arc(state.x+r/2,canvas.height-floorHeight-state.y-r/2,r,0,2*Math.PI);
    ctx.stroke();
  };

  return(
    <>
    <Header title="Kinematics"/>
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas}/>
    </div>
      <button onClick={startSimulation} disabled={!wasmReady||running}>
        Start Simulation
      </button>
      <button onClick={stopSimulation} disabled={!running}>
        Stop Simulation
      </button>
    </>
  );
}

export default Kinematics;

/* 
The code below works, but its AI generated and I want to understand it first.



const [wasmReady,setWasmReady]=useState(false);

  useEffect(()=>{
    // Check if script already exists
    if (document.querySelector('script[src="/hello.js"]')) {
      if ((window as any).wasmModule) {
        setWasmReady(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = '/hello.js';
    script.onload = () => {
      // Try both patterns
      if ((window as any).Module) {
        const moduleOrPromise = (window as any).Module;
        
        if (typeof moduleOrPromise === 'function') {
          moduleOrPromise().then((module: any) => {
            console.log("Module keys:", Object.keys(module));
            (window as any).wasmModule = module;
            setWasmReady(true);
          });
        } else {
          // Module is already ready
          console.log("Module keys:", Object.keys(moduleOrPromise));
          (window as any).wasmModule = moduleOrPromise;
          setWasmReady(true);
        }
      }
    };
    document.head.appendChild(script);
  },[]);

  function clickHandler(){
    if(wasmReady){
      console.log("Button clicked -calling C++");
      (window as any).wasmModule.sayHello();
    }
  }
   return(
        <>
        <Header/>
        
        <button onClick={clickHandler} disabled={!wasmReady}>TEST BUTTON</button>
        </>
    );
*/