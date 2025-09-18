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
    x:0,y:0,vx:100,vy:40,ax:0,ay:-9.8,shouldContinue:true
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
            (window as any).wasmModule = module;
            setWasmReady(true);
          });
        } else {
          // Module is already ready
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
    const wasm=(window as any).wasmModule;

    let lastTime=performance.now();
    let timeSince=0;
    const dt=1/30;

    function frame(now:number){
      let realDt=(now-lastTime)/1000;
      lastTime=now;
      timeSince+=realDt;

      while (timeSince >= dt) {
        const newState = wasm.stepSimulation(dt); // call C++
        timeSince -= dt;
        if (!newState.shouldContinue) {
          setRunning(false);
          console.log("Simulation stopped");
          return;
        }
       setState(newState);
      }
     requestAnimationFrame(frame);
    }
    frame(lastTime);
  },[wasmReady,running]);

  //start simulation button handler
  const startSimulation=()=>{
    if(!wasmReady)return;

    const wasm=(window as any).wasmModule;

    //initialize c++ with current params
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
    ctx.fillStyle='black';
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
    //draw floor
    ctx.fillStyle='grey';
    let floorHeight=100;
    ctx.fillRect(0,canvas.height-100,canvas.width,100);
    //draw object
    let r=5
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(state.x + 3*r, canvas.height - 100 - state.y  - r, r, 0, 2*Math.PI);
    console.log("Drawing at:",state.x + 3*r, canvas.height - 100 - state.y);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
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
