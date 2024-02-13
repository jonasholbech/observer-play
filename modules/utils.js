export function randomColor(hue = 50, lightness = 70) {
  return `hsl(${randomNumber(360)},${hue}%, ${lightness}%)`;
}
export function weightedRandom(values, weights) {
  // Check if lengths are equal
  if (values.length !== weights.length) {
    throw new Error("Values and weights arrays must have the same length");
  }

  // Calculate total weight
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  // Create accumulation table
  const accumulationTable = [];
  let accumulatedWeight = 0;
  for (let i = 0; i < values.length; i++) {
    accumulatedWeight += weights[i];
    accumulationTable.push(accumulatedWeight);
  }

  // Generate random number
  const randomValue = Math.random() * totalWeight;

  // Find corresponding value
  for (let i = 0; i < accumulationTable.length; i++) {
    if (randomValue <= accumulationTable[i]) {
      return values[i];
    }
  }
}
export function randomNumber(max, min = 0) {
  // Ensure min is always less than or equal to max
  if (min > max) {
    [min, max] = [max, min];
  }
  // Return a random number between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function count() {
  let count = 0;
  return function next() {
    count++;
    return count;
  };
}
export function shuffleArrayFisherYates(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there are elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
