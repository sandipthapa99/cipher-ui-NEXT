export const randNumber = (max: number, min = 0) => {
    return Math.floor(Math.random() * max) + min;
};
