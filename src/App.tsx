import { useState, useRef, useEffect } from 'react'
import './App.css'
import PolygramImage from './PolygramImage'

function App() {
  const [vertices, setVertices] = useState(5);
  const [steps, setSteps] = useState(2);
  const size = 500;

  const verticesRef = useRef<HTMLInputElement>(null);
  const stepsRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(verticesRef.current){
      verticesRef.current.value = vertices.toString();
    }
    if(stepsRef.current){
      stepsRef.current.value = steps.toString();
    }
  },[vertices, steps]);

  function drawPolygram(){
    if (verticesRef.current && stepsRef.current){
      let verticesValue = parseInt(verticesRef.current.value);
      const stepsValue = parseInt(stepsRef.current.value);

      if (verticesValue < parseInt(verticesRef.current.min)){
        verticesValue = parseInt(verticesRef.current.min);
      }else if(verticesValue > parseInt(verticesRef.current.max)){
        verticesValue = parseInt(verticesRef.current.max);
      }
      setVertices(verticesValue);
      setSteps(stepsValue);
    }
  }

  return (
    <>
      <h1>Polygram maker</h1>
      <div className="fields">
        <label htmlFor="vertices">Vertices:</label>
        <input type="number" id="vertices" name="vertices" min="2" max="100" step="1" ref={verticesRef} />
        <label htmlFor="steps">Steps:</label>
        <input type="number" id="steps" name="steps" min="1" step="1" ref={stepsRef} />
        <button onClick={drawPolygram}>Draw</button>
      </div>

      <div className="container">
        <PolygramImage vertices={vertices} steps={steps} size={size} />
      </div>
    </>
  )
}

export default App