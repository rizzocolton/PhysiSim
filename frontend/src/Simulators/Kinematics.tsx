import Header from '../Header/Header';
import {useEffect,useState} from 'react';

function Kinematics(){
/*const [wasmReady, setWasmReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/main.out.js';
    script.onload = () => {
      // Wait for Module to be ready
      window.Module().then(() => {
        setWasmReady(true);
        console.log("WASM ready!");
      });
    };
    document.head.appendChild(script); // This was missing!
  }, []);

  function clickHandler() {
    if (wasmReady && window.Module) {
      window.Module.ccall('main', null, [], []);
    }
  }*/

  

    return(
        <>
        <head>
            <script src="/main.out.js"></script>
        </head>
        <Header/>
        
        <button onClick={Module.ccall("main",null,[],[])} disabled={!wasmReady}>TEST BUTTON</button>
        </>
    );
}

export default Kinematics;