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
    let checkIn = await page.$x(selectors.checkInInputValue);
    let checkInDate = await page.evaluate(el => el.value, checkIn[0]);
    const checkInJson = JSON.stringify({ checkin: checkInDate });

    await page.waitForXPath(selectors.checkOutInputValue);
    let checkOut = await page.$x(selectors.checkOutInputValue);
    let checkOutDate = await page.evaluate(el => el.value, checkOut[0]);
    const checkOutJson = JSON.stringify({ checkOut: checkOutDate });

    await page.waitForXPath(selectors.adultsInputValue);
    let adults = await page.$x(selectors.adultsInputValue);
    let adultsGuests = await page.evaluate(el => el.value, adults[0]);
    const adultsJson = JSON.stringify({ adults: adultsGuests });

    await page.waitForXPath(selectors.childrenInputValue);
    let children = await page.$x(selectors.childrenInputValue);
    let childrenGuests = await page.evaluate(el => el.value, children[0]);
    const childrenJson = JSON.stringify({ children: childrenGuests });

    // await page.exposeFunction('totalGuestsSum', () => {
    //     totalGuests = String.valueOf(Integer.parseInt(adultsGuests) + Integer.parseInt(childrenGuests));
    //     return totalGuests;
    // });

    // const result = await page.evaluate(() => {
    //     return totalGuestsSum();
    // });

    // totalGuestsSum();
    // const totalGuestsJson = JSON.stringify({ guests: totalGuestsSum() });

    const lang = await page.evaluate(() => {
        const code = document.querySelector('html').lang;
        return code;
    });
    const langJson = JSON.stringify({ Language: lang });

    await page.waitForSelector(selectors.rates);
    const rates = await page.evaluate(() => {
        const rates = document.querySelectorAll('.room-rates-item-price-moy');
        let arrayRates = [];
        rates.forEach(rate => {
            arrayRates.push(rate.innerText.replace(/\s*\u20ac\s*/ig, ' EUR'));
        });
        return arrayRates;
    });

    function minimunRateAvailable() {
        const onlyRate = [];
        rates.forEach(rate => {
            return onlyRate.push(rate.replace(/EUR/g, ''));
        });
        let stringToInt = onlyRate.map(Number);
        const minRate = stringToInt.sort(function(a, b) { return a - b; });
        return minRate[0];
    };
    console.log(minimunRateAvailable());

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
        let roomsAvailable = [];
        for (let i = 0; i < rates.length; i++) {
            roomsAvailable[i] = { room: rates[i] + " - " + extras[i] + " - " + refundables[i] };
        }
        return roomsAvailable;
    });

    const resultList = await page.evaluate(() => {
        return joinArrayResults();
    });

    let resultSearch = { results: langJson + checkInJson + checkOutJson + adultsJson + childrenJson /* + totalGuestsJson */ }


    // fs.writeFileSync(
    //     path.join(__dirname, `${website.scriptName}.json`), JSON.stringify(totalResults), 'utf8'
    // );

};