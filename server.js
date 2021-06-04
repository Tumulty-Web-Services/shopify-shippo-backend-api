require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

const express = require("express");
const app = express();
const { queryShopify } = require("./services/shopify");
const { queryOrderName } = require("./queries/");

// middleware -- some drivers to help assist with the flow of data over our routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/order-id", async (req, res) => {
  const id = req.body.id;
  console.log(process.env.NODE_ENV);
  console.log(process.env.SHOPIFY_STORE_URL);
  console.log(process.env.SHOPIFY_PASS);
  const request = await queryShopify(queryOrderName(id));
  const results = request.data.orders.edges.map(({ node }) => {
    return {
      id: node.id,
      name: node.name,
      lineItems: node.lineItems,
      sku: node.sku,
    };
  });

  return res.json({
    message: "This will return with shopify data based on an order some day :)",
    status: 200,
    data: results,
  });
});
app.listen(8080, () => {
  console.log("Server listening on port: 8080");
});
