const puppeteer = require('puppeteer')

const scrapeData = async  () => {
  // await puppeteer.createBrowserFetcher().download(
  //   puppeteer.PUPPETEER_REVISIONS.chronium
  // )

  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()

  await page.goto('https://www.tripadvisor.com/RestaurantsNear-g155032-d155416-McGill_University-Montreal_Quebec.html',{
    waitUntil: "domcontentloaded"
  })

  const body = await page.evaluate(() => {
    const restaurants_names_selections = document.querySelectorAll('.near_listing')
    const temp2  = {}
    Object.keys(restaurants_names_selections).map(key => {
      const location_name = temp2[key].querySelector('.location_name')
      temp2[key]['name'] = location_name.textContent
    })

    // const temp = document.querySelectorAll('.rs.rating')
    // const temp3  = {}
    // Object.keys(temp).map(key => {
    //   temp2[key]['name'] = temp[key].textContent
    // })

    return {restaurants_names: temp2}
  })

  browser.close()
 
  return body
}

scrapeData().then((res) => {
  console.log(res, 'RESPOSSDFSDF')
}).catch((err) => console.log(err, 'EROROROROROEORE'))

exports.scrapeData = scrapeData