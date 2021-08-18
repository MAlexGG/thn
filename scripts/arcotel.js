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

    await page.waitForXPath("/html/body/div[3]/div/div[2]/div[1]/header/div[2]/div/span[1]/input");
    let checkIn = await page.$x("/html/body/div[3]/div/div[2]/div[1]/header/div[2]/div/span[1]/input");
    let checkInDate = await page.evaluate(el => el.value, checkIn[0]);
    console.log(checkInDate);

    await page.waitForXPath("/html/body/div[3]/div/div[2]/div[1]/header/div[2]/div/span[2]/input");
    let checkOut = await page.$x("/html/body/div[3]/div/div[2]/div[1]/header/div[2]/div/span[2]/input");
    let checkOutDate = await page.evaluate(el => el.value, checkOut[0]);
    console.log(checkOutDate);




    await page.waitForSelector(selectors.rates);
    await page.evaluate(() => {
        const rates = document.querySelectorAll('.room-rates-item-price-moy');
        let arrayRates = [];
        rates.forEach(rate => {
            arrayRates.push(rate.innerText.replace(/\s*\u20ac\s*/ig, ' EUR'));
        });
        console.log(arrayRates);
    });

    const lang = await page.evaluate(() => {
        const code = document.querySelector('html').lang;
        return code;
    });
    console.log(lang);

    await page.waitForSelector(selectors.extras);
    await page.evaluate(() => {
        const extras = document.querySelectorAll('.room-rates-item-title-meal-plan');
        let arrayExtras = [];
        extras.forEach(extra => {
            arrayExtras.push(extra.innerText);
        });
        console.log(arrayExtras);
    });

    await page.waitForSelector(selectors.refundable);
    await page.evaluate(() => {
        const refundable = document.querySelectorAll('.room-rates-item-info-text');
        let arrayRefundable = [];
        refundable.forEach(refundable => {
            arrayRefundable.push(refundable.innerText);
        });
        console.log(arrayRefundable);
    });

};