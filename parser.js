// Amazon Price Tracker learned from https://www.youtube.com/watch?v=H5ObmDUjKV4
// example url for test "https://www.amazon.co.uk/WD-Elements-Portable-External-Drive/dp/B06VVS7S94"
// we want to know if the price has dropped below £30 so we supply it 30
// to run just do the following supplying a url and a min price "node parser.js https://www.amazon.co.uk/WD-Elements-Portable-External-Drive/dp/B06VVS7S94 30"

const nightmare = require("nightmare")();
const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

checkPrice();
async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("£", ""));
  if (priceNumber < minPrice) {
    console.log("It is cheap at less than £30");
  } else {
    console.log("It is still expensive");
  }
}
