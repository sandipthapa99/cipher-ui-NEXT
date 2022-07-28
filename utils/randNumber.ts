export const randNumber = (max = 1000, min = 0) => {
    return Math.floor(Math.random() * max) + min;
};
