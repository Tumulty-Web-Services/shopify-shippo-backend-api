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
  const request = await queryShopify(queryOrderName(id));
  
  const userInfo = request.data.orders.edges.map(({node}) => {
    return {
      url: node.id,
      id: node.name,
      name: node.shippingAddress.name,
      email: node.email,
      phone: node.phone
    }
  })[0];

  const shippingInfo = request.data.orders.edges.map(({ node}) => {
    return node.shippingAddress
  })[0];

  const orders = request.data.orders.edges.map(({ node }) => node.lineItems.edges.map(({ node })=> ({
        title: node.title,
        sku: node.sku,
        variantTitle: node.variantTitle
      })),
  )[0];  

  return res.json({
    status: 200,
    data: {
      userInfo,
      shippingInfo,
      orders
    },
  });
});
app.listen(8080, () => {
  console.log("Server listening on port: 8080");
});
