import {useEffect,useState, useRef, useCallback, use} from 'react';
import Header from '../Header/Header';
import styles from './Simulator.module.css';
import * as kinTypes from '../types';

const firstState:kinTypes.kinematicsState={
    simObject:{
        pos:{
            x:0,
            y:0
        },
        vel:{
            x:0,
            y:0
        },
        acc:{
            x:0,
            y:-9.8
        },
        r:1,
    },
    gravity:-9.8,
    time:0,
    shouldContinue:false
}

const defaultBoundaries:kinTypes.simulationBounds={
    sF:5,
    widthP:1000,
    heightP:500,
    floorHeight:100
}



function Kinematics(){
    //initialize the state of the simulation with a default
    const[State,setState]=useState(firstState);

    //References to canvas and animation state, bypasses Reacts virtual dom and prevents re-rendering and such

    const canvasRef=useRef<HTMLCanvasElement>(null);
    const animationRef=useRef<number|null>(null);

    //stateful variables for whether or not wasm is ready and the sim is running
    const [wasmReady, setWasmReady] = useState(false);
    const [running, setRunning] = useState(false);
    
    /*
    The following sets up the wasm module to interact with C++ as soon as this module is mounted, 
    it is ai generated as all other implementations I've tried simply were not working, 
    perhaps it's something to do with strictMode "double mounting" this useEffect hook.
    Regardless the general principle of this hook is to get the wasm module funcitonal, it's looking to add the js wrapper file
    created by the Emscripten which would then load the wasm file with the binary code. It then sets up some shared memory
    and creates js functions that can call C++ functions
    */
    useEffect(()=>{
        //check if script was already loaded to avoid duplicates
        if(document.querySelector('script[src="/kinematics.js"]')){
            if((window as any).wasmModule){
                setWasmReady(true);
            }
        }

        const script=document.createElement('script');
        script.src='/kinematics.js'; //that emscripten wrapper file located in public directory

        script.onload=()=>{
            if((window as any).Module){
                const moduleOrPromise=(window as any).Module;
                // Emscripten can expose Module as:
                // - Direct object (immediately ready)
                // - Factory function returning Promise (async initialization)
                if (typeof moduleOrPromise === 'function') {
                     // Async: wait for WASM compilation and memory setup
                     moduleOrPromise().then((module: any) => {
                     (window as any).wasmModule = module;
                     setWasmReady(true);
                     });
                }else{
                     // Sync: Module already initialized
                     (window as any).wasmModule = moduleOrPromise;
                     setWasmReady(true);
                }
            }
        };
        document.head.appendChild(script);
    },[])

    //Canvas setup
    useEffect(()=>{
        //this canvas constant is pointing to the canvas element created on screen
        const canvas=canvasRef.current;
        if(!canvas){
            return;
        }
        canvas.width=defaultBoundaries.widthP;
        canvas.height=defaultBoundaries.heightP;
        //draws the initial state
        render();
    },[])

    //re-renders whenever simulation state changes
    useEffect(()=>{
        render();
    },[State])

    const simulationLoop=useCallback(()=>{
        if(!wasmReady){
            console.warn("wasm is not ready");
            return;
        }
        //useable accessor to c++ functions
        const wasm=(window as any).wasmModule as kinTypes.kinematicsWASM;
        
        //makes sure simulation runs accurately despite variations in framerate
        let lastTime=performance.now();
        let timeSince=0;
        const dt=1/120;

    },[wasmReady,running])


}

export default Kinematics;