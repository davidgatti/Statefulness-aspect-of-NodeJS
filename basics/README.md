![Basic example](https://github.com/davidgatti/Statefulness-aspect-of-NodeJS/blob/assets/basics.gif)

# Basic Example

This is the most basic example, which showcases the stateful aspect of NodeJS. The code above is literarily the same example code from http://nodejs.org with 3 additional lines, and one modification.

- On line 6, we declare an array, and we'll add new entries at each request.
- Line 10 adds a new element to the array when there is a request.
- Line 11 counts how many elements we have in the array.
- Line 15 displays how many elements we have in the array.

As you can see from the GIF above, the array stays in memory, even after refreshing the page. Proving that the NodeJS is compiled and stays in memory, and only the code responsible for the request will be reload at each request, similarly to a regular function.
