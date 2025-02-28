//basic point type
type Point = {
    x:number;
    y:number;
}
//a dictionary of points, used to keep track of points by their index
type PointIndex = {
    [dict_key:number]:Point;
};

export default class Polygram{
    sides:number;
    steps:number;
    radius:number;
    margin:number; //offset from edge of svg because of pointy corners
    #points:Point[] = [];


    constructor(sides:number, steps:number, size:number, margin:number = 5){
        this.sides = sides;
        this.steps = steps;
        this.radius = size / 2; //radius is important, it's the centre and calculated from size
        this.margin = margin;
        this.setPoints();
    }
    setPoints(){
        //calculate the coordinates of each point on the circle
        for(let p=0; p<this.sides; p++){
            //angles are in radians
            const angle = (Math.PI * 2) / this.sides * p;
            //we want to start from the top of the circle, normally cos and sin are reversed but that starts from the right of the circle
            const y = this.radius * Math.cos(angle);
            const x = this.radius * Math.sin(angle);
            this.#points.push({x:x, y:y});
        }
        console.log(this.#points);
    }
    get points(){
        return this.#points;
    }
    //get the "d" attribute for the path elements
    getPaths(){
        const dpaths:string[] = []; //an array of path "d" attributes
        const undrawnPoints:PointIndex = {}; //we need to determine which points have been drawn
        //assign to the undrawnPoints
        this.#points.forEach((p, key)=>{
            undrawnPoints[key] = {x:p.x, y:p.y};
        });

        let startVertex = 0; //starting vertex of a polygon path

        while(Object.keys(undrawnPoints).length > 0){ //keep drawing until all points visited
            const startPoint = this.#points[startVertex];
            console.log(`startVertex: ${startVertex}`);
            let path = `M ${startPoint.x + this.radius + this.margin} ${this.radius - startPoint.y + this.margin}`; //move to starting point
            delete undrawnPoints[startVertex]; //remove because starting point has been drawn
            let currentVertex = (startVertex + this.steps) % this.sides; //determine the next vertex to draw, could be greater than sides so we carry over
            while(currentVertex != startVertex){ //keep drawing until the starting point is reached
                console.log(currentVertex);
                const currentPoint = this.#points[currentVertex];
                path += ` L ${currentPoint.x + this.radius + this.margin} ${this.radius - currentPoint.y + this.margin}`; //draw a line to the next point
                delete undrawnPoints[currentVertex]; //remove because point has been drawn

                currentVertex = (currentVertex + this.steps) % this.sides; //determine the next vertex to draw, could be greater than sides so we carry over
            }
            path += ` Z`; //close the path
            console.log(path);
            dpaths.push(path); //add to the paths
            if(Object.keys(undrawnPoints).length > 0){ //so if a round trip didn't draw all points, start over from the next undrawn point
                startVertex += 1;
            }
        }
        return dpaths;
    }
}