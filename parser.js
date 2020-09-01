// Amazon Price Tracker learned from https://www.youtube.com/watch?v=H5ObmDUjKV4

require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nightmare = require("nightmare")();
const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

async function checkPrice() {
  const priceString = await nightmare
    .goto(
      "https://www.amazon.co.uk/WD-Elements-Portable-External-Drive/dp/B06VVS7S94"
    )
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("£", ""));
}
