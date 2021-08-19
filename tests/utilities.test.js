const utilities = require('../scripts/utilities');

/**
 * @jest-environment puppeteer
 */

describe("unit tests", () => {
    beforeAll(async() => {
        jest.setTimeout(10000);
    });

    it("should sum 2 numbers", () => {
        const adults = 2;
        const children = 1;
        const sumGuests = utilities.totalGuestsSum(adults, children);
        expect(sumGuests).toBe(3);
    })

    it("should return the minimun rate", () => {
        const rates = ['120 EUR', '60 EUR'];
        const minimun = utilities.minimunRateAvailable(rates);
        expect(minimun).toBe(60);
    });


});