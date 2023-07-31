export function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

export function getRandomFromArray(arr) {
    return arr[getRandomInt(0, arr.length)];
}
