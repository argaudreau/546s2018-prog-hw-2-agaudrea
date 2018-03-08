Programming Assignment 1
Graphics 1 Spring 2018
Programmer: Adam Gaudreau
Due: 9 March 2018

==========
 Overview
==========
In this programming assignment, I implemented the 2 Exam 1 questions. One was to implement a fractal algorithm for some primitives, and the other was the wheel problem.

============
 How to use
============
The landing page shows problem 1. On the right under "Settings", you can choose the primitive from the dropdown, change the ration, and the number of iterations. Hit apply when you've set it to what you want, and you'll see it render on the canvas. For any of these, you can change the color of the canvas or stroke, the size of the stroke, and how each line will join together.
To see problem 2, click the button on the top right that says "GO TO PROBLEM 2".
Once you're on the second page, you will see the wheel rotating on the page. You may change the radius and the score (which will change the shape of the wheel accordingly). Please note that for scores between (20-79) it may be hard to see that it's a polygon since there are so many sides, but if you go lower than 20 you'll definitely see that it's a polygon. Similar to before, there is some stylistic elements you may change on the right under "Options".

==============
 "Impress me"
==============
Other than implementing a nice, easy to read interface, I've made the wheel spin in the second problem so you can see it in action. You're even eble to change the speed.

================
 Known problems
================
Everything works as intended, except for the arc. It sort of works at 0 and 1 iterations, but afterwords it gets complicated. I've already spent over 20 hours on this implementation and had to focus on other classes.
