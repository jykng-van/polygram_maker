import { useState, useRef, useEffect } from 'react'
import './App.css'
import PolygramImage from './PolygramImage'

function App() {
  const [sides, setSides] = useState(5);
  const [steps, setSteps] = useState(2);
  const size = 500;

  const sidesRef = useRef<HTMLInputElement>(null);
  const stepsRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(sidesRef.current){
      sidesRef.current.value = sides.toString();
    }
    if(stepsRef.current){
      stepsRef.current.value = steps.toString();
    }
  },[sides, steps]);

  function drawPolygram(){
    if (sidesRef.current && stepsRef.current){
      let sidesValue = parseInt(sidesRef.current.value);
      const stepsValue = parseInt(stepsRef.current.value);

      if (sidesValue < parseInt(sidesRef.current.min)){
        sidesValue = parseInt(sidesRef.current.min);
      }else if(sidesValue > parseInt(sidesRef.current.max)){
        sidesValue = parseInt(sidesRef.current.max);
      }
      setSides(sidesValue);
      setSteps(stepsValue);
    }
  }

  return (
    <>
      <h1>Polygram maker</h1>
      <div className="fields">
        <label htmlFor="sides">Sides:</label>
        <input type="number" id="sides" name="sides" min="2" max="100" step="1" ref={sidesRef} />
        <label htmlFor="steps">Steps:</label>
        <input type="number" id="steps" name="steps" min="1" step="1" ref={stepsRef} />
        <button onClick={drawPolygram}>Draw</button>
      </div>

      <div className="container">
        <PolygramImage sides={sides} steps={steps} size={size} />
      </div>
    </>
  )
}

export default App
