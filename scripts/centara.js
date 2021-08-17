module.exports = async(page, website) => {
    const { selectors } = website;
    await page.goto(website.url);

    const bookNow = await page.$(selectors.bookNowButton);
    await bookNow.evaluate(bookNow => bookNow.click());


};