import { describe, it, expect } from 'vitest';
import Polygram from './Polygram'; // Adjust the import according to your file structure


describe('Polygram', () => {
    const square = [4,1,100];
    const pentagram = [5,2,100];
    const hexagram = [6,2,100];

    it('should create an instance of Polygram', () => {
        const [vertices, steps, size] = pentagram;
        const polygram = new Polygram(vertices, steps, size);
        expect(polygram).toBeInstanceOf(Polygram);
    });

    it('should have the correct number of points', () => {
        const [vertices, steps, size] = pentagram;
        const polygram = new Polygram(vertices, steps, size);
        expect(polygram.points.length).toBe(vertices);
    });

    it('should not have any point outside the circle', ()=>{
        const [vertices, steps, size] = square;
        const polygram = new Polygram(vertices, steps, size);
        expect(polygram.points.every(p=>p.x <= size/2 && p.y <= size/2)).toBe(true);
    });

    it('should have the path coordinates be inside the svg drawing area', ()=>{
        const [vertices, steps, size] = square;
        const margin = 5;
        const polygram = new Polygram(vertices, steps, size, margin);
        expect(polygram.getPaths().every(path=>
            path.split(' ').filter(Number).every(coord=>parseInt(coord) >= margin && parseInt(coord) <= size + margin*2)
        )).toBe(true);
    });

    it('should have the correct number of paths', ()=>{
        const [vertices, steps, size] = hexagram;
        const polygram = new Polygram(vertices, steps, size);
        expect(polygram.getPaths().length).toBe(2);
    });
});