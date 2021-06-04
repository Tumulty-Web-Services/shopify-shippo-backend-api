const fetch = require('node-fetch');

function queryShopify(query) {
    return fetch(process.env.SHOPIFY_STORE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_PASS,
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((result) => result.json())
        .then((data) => data)
        .catch((err) => err);
}
module.exports = {
  queryShopify
}