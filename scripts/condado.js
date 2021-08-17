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

    // await page.waitForSelector(selectors.infoList);


    // const room = await page.evaluate(() => {
    //     const roomText = document.querySelectorAll(".wbkv9-Entity-name");
    //     const rooms = [];
    //     roomText.forEach(item => {
    //         rooms.push(item.innerText);
    //     })
    //     return rooms;
    // });
    // console.log(room);














    // const roomText = await page.evaluate((a) => {
    //     const roomList = document.querySelectorAll(a);
    //     const roomText = [];
    //     for (const room of roomList) {
    //         roomText.push(room.innerText);
    //     }
    //     return roomText;
    // });
    // console.log(roomText);



    // const rooms = await page.evaluateHandle(() => {
    //     return Array.from(document.querySelectorAll('.wbkv9-Entity-name'));
    // });
    // await rooms.evaluate(() => {
    //     console.log(rooms.length);
    // })

    // console.log(rooms);



};