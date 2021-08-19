const fs = require('fs');
const path = require('path');

module.exports = async(page, website) => {
    const { selectors } = website;
    await page.goto(website.url);
    await page.waitForSelector('.this-form-label');
    await page.focus(selectors.checkIn);
    await page.type(selectors.checkIn, '11 Ene 2022');
    await page.keyboard.press("Enter");
    await page.focus(selectors.checkOut);
    await page.click(selectors.checkOut, { clickCount: 3 });
    await page.keyboard.press("Backspace");
    await page.type(selectors.checkOut, '14 Ene 2022');
    await page.$eval(selectors.adultsGuests, el => el.value = '2');
    await page.$eval(selectors.childrenGuests, el => el.value = '1');
    await page.click(selectors.bookInButton);

    await page.waitForXPath(selectors.checkInInputValue);
    let checkInSelector = await page.$x(selectors.checkInInputValue);
    let checkInDate = await page.evaluate(el => el.value, checkInSelector[0]);
    const checkIn = JSON.stringify(checkInDate).replace(/\"/g, '');

    await page.waitForXPath(selectors.checkOutInputValue);
    let checkOutSelector = await page.$x(selectors.checkOutInputValue);
    let checkOutDate = await page.evaluate(el => el.value, checkOutSelector[0]);
    const checkOut = JSON.stringify(checkOutDate).replace(/\"/g, '');

    await page.waitForXPath(selectors.adultsInputValue);
    let adultsSelector = await page.$x(selectors.adultsInputValue);
    let adultsGuests = await page.evaluate(el => el.value, adultsSelector[0]);
    const adults = parseInt(adultsGuests);

    await page.waitForXPath(selectors.childrenInputValue);
    let childrenSelector = await page.$x(selectors.childrenInputValue);
    let childrenGuests = await page.evaluate(el => el.value, (childrenSelector[0]));
    let children = parseInt(childrenGuests);


    await page.exposeFunction('totalGuestsSum', () => {
        const guestsSum = adults + children;
        return guestsSum;
    });
    const totalGuests = await page.evaluate(() => {
        return totalGuestsSum();
    });

    const language = await page.evaluate(() => {
        const code = document.querySelector('html').lang;
        return code;
    });

    await page.waitForSelector(selectors.rates);
    const rates = await page.evaluate(() => {
        const rates = document.querySelectorAll('.room-rates-item-price-moy');
        let arrayRates = [];
        rates.forEach(rate => {
            arrayRates.push(rate.innerText.replace(/\s*\u20ac\s*/ig, ' EUR'));
        });
        return arrayRates;
    });

    await page.waitForSelector(selectors.rates);
    const currency = await page.evaluate(() => {
        const currency = document.querySelector('.room-rates-item-price-moy');
        //currency.innerText.replace((/\s*\107\s*/ig, ''))
    });
    console.log(currency);

    function minimunRateAvailable() {
        const onlyRate = [];
        rates.forEach(rate => {
            return onlyRate.push(rate.replace(/EUR/g, ''));
        });
        let stringToInt = onlyRate.map(Number);
        const minRate = stringToInt.sort(function(a, b) { return a - b; });
        return minRate[0];
    };
    const minimunRate = minimunRateAvailable();

    await page.waitForSelector(selectors.extras);
    const extras = await page.evaluate(() => {
        const extras = document.querySelectorAll('.room-rates-item-title-meal-plan');
        let arrayExtras = [];
        extras.forEach(extra => {
            arrayExtras.push(extra.innerText);
        });
        return arrayExtras;
    });

    await page.waitForSelector(selectors.refundable);
    const refundables = await page.evaluate(() => {
        const refundable = document.querySelectorAll('.room-rates-item-info-text');
        let arrayRefundable = [];
        refundable.forEach(refundable => {
            arrayRefundable.push(refundable.innerText);
        });
        return arrayRefundable;
    });

    await page.exposeFunction('joinArrayResults', () => {
        const resultList = rates.map((rate, index) => `${rate} - ${extras[index]} - ${refundables[index]}`).concat({ language, checkIn, checkOut, adults, children, totalGuests, minimunRate });
        return resultList;
    });
    const resultList = await page.evaluate(() => {
        return joinArrayResults();
    });




    fs.writeFileSync(
        path.join(__dirname, `${website.scriptName}.json`), JSON.stringify(resultList), 'utf8'
    );

};