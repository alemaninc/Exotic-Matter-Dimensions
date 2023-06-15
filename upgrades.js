"use strict";
/*
Everything that is represented in "g" as an object generated from a list of keys is stored here and executed directly before main.js.
*/
const starList = countTo(10).map(x=>countTo(4).map(y=>x*10+y)).flat()