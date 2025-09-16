import {useEffect,useState, useRef} from 'react';
import Header from '../Header/Header';
import styles from './Simulator.module.css';

function Kinematics(){
  //constants
  const FIXED_TIME_STEP=1/120;

  //reference for react to modify component once its mounted
  const canvasRef=useRef(null);
  let simRunning=false;

  //state object,
  const [State,setState]=useState({
    params: 0
  });
  
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

  //canvas update function, runs whenever state changes
  useEffect(()=>{
    render();
  },[State]);

  function render(){
    const canvas=canvasRef.current;
    if(!canvas) return;
    
    const ctx=canvas.getContext('2d');

    //canvas reset
    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //draw ground
    ctx.strokeStyle='black';
    ctx.lineWIdth=3;
    ctx.beginPath();
    ctx.moveTo(0,450);
    ctx.lineTo(canvas.width,450);
    ctx.stroke();
  }

  return(
    <>
    <Header title="Kinematics"/>
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas}/>
    </div>
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