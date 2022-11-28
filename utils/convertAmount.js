export function convertAmount(value) {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + value).length / 3);
    let shortValue = parseFloat(
        (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
        ).toPrecision(2)
    );
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(2);
    }
    return shortValue + suffixes[suffixNum];
}
