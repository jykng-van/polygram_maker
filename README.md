# Polygram Maker
Makes a polygram with a number of vertices and steps.

The polygrams made by this is, will output as SVG code. Vertices are the number of points around a cricle (which is not drawn). While Steps are how many points it's skips over when drawing the polygram.

The commonly recognized Pentagram (which is just the star shape, because the star and circle are really what's called a Pentacle) has 5 vertices and 2 steps. When drawing the lines of the polygram shape it will go around to each point around the circle till it reaches the starting point.

Some combinations of vertices and steps, such as the Hexagram with 6 vertices and 2 steps will not go to each point with after returning to the starting point, so it will start another path with the next point as the starting point.

The polygram maker can accept any integer as the number of steps. But 0 steps will make a bunch of dots in a circular formation. 1 step will simply make a polygon shape. A number of steps that's half of an even number of vertices will make some intersecting lines.

Any integer could be the number of steps, as it calculates next step by **(Current Point + Steps) % Vertices** to determine the next point to draw to. And there's many cases different numbers of steps produce the same results, such as 2 and 3 steps for a 5 sided polygram.