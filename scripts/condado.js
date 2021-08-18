module.exports = async(page, website) => {
    const { selectors } = website;
    await page.goto(website.url);
    const closePopUp = await page.$(selectors.infoPopUp);
    await closePopUp.evaluate(closePopUp => closePopUp.click());
    await page.$eval(selectors.checkIn, el => el.value = '10-09-2021');
    await page.$eval(selectors.checkOut, el => el.value = '13-09-2021');
    await page.$eval(selectors.guests, el => el.value = '2');
    const bookIn = await page.$(selectors.bookInButton);
    await bookIn.evaluate(bookIn => bookIn.click());

    const language = await page.evaluate(() => {
        const code = document.querySelector('html').lang;
        return code;
    });
    console.log(language);

    await page.waitForSelector(selectors.infoContainer);
    await page.evaluate((infoContainer) => {
        const infoContainerAll = document.querySelectorAll(infoContainer);
        for (const item of infoContainerAll) {
            console.log(item.innerText);
        }
    }, selectors.infoContainer);

    // await page.evaluate(() => {
    //     const rooms = document.querySelectorAll('html');
    //     console.log(rooms.innerText);
    // let newArray = [];
    // rooms.forEach(item => {
    //     newArray.push(item.innerText)
    // });
    // console.log(newArray);
    // });


};