const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    //create "numElements" non-repeating random numbers from "min" - "max"
    nonRepeatingRandoms: (numElements, min, max) => {
      let col = [];
    
      for (let i = 0; i < numElements; i++) {
        let possibleNum = utils.random(min, max);

        if (!col.includes(possibleNum)) {
          col.push(possibleNum);
        } else {
          i--;
        }
      }
      return(col);
    }
  };

  export default utils;