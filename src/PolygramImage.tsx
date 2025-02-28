import { useState, useEffect } from "react";
import Polygram from "./Polygram";

interface PolygramProps{
    sides:number;
    steps:number;
    size:number;
    margin?:number;
}
export default function PolygramImage({sides, steps, size, margin=5}:PolygramProps){
    const svg_size = size + 2*margin;
    const [paths, setPaths] = useState<string[]>([]);

    useEffect(()=>{
        const polygram = new Polygram(sides, steps, size);
        const dpaths = polygram.getPaths();
        setPaths(dpaths);
    },[sides, steps, size]);


    return (
        <svg width={svg_size} height={svg_size} viewBox={`0 0 ${svg_size} ${svg_size}`} xmlns="http://www.w3.org/2000/svg">
            {paths.map((path, index)=>{
                return <path key={index} d={path} fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            })}
        </svg>
    )
}