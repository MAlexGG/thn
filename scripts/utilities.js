const totalGuestsSum = (adults, children) => {
    const guestsSum = adults + children;
    return guestsSum;
};

const minimunRateAvailable = (rates) => {
    const onlyRate = [];
    rates.forEach(rate => {
        return onlyRate.push(rate.replace(/EUR/g, ''));
    });
    let stringToInt = onlyRate.map(Number);
    const minRate = stringToInt.sort(function(a, b) { return a - b; });
    return minRate[0];
};

module.exports = { minimunRateAvailable, totalGuestsSum };