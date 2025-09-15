import Header from '../Header/Header';
import {useEffect,useState} from 'react';

function Kinematics(){
  return(
    <Header title="Kinematics"/>
    
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