require("dotenv").config();
const express = require("express");
const app = express();
const queryShopify = require("./services/shopify");
const createAndSendLabel = require("./services/shippo");
const queryOrderName = require("./queries/");

const PORT = process.env.PORT || 8080;

// middleware -- some drivers to help assist with the flow of data over our routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/***
 * This endpoint gets the order details, and shipping information based on the id of the customer
 */
app.post("/api/order-id", async (req, res) => {
  try {
    const id = req.body.id;
    const request = await queryShopify(queryOrderName(id));

    const userInfo = request.data.orders.edges.map(({ node }) => {
      return {
        url: node.id,
        id: node.name,
        name: node.shippingAddress.name,
        email: node.email,
        phone: node.phone,
      };
    })[0];

    const shippingInfo = request.data.orders.edges.map(({ node }) => {
      return node.shippingAddress;
    })[0];

    const orders = request.data.orders.edges.map(({ node }) =>
      node.lineItems.edges.map(({ node }) => ({
        title: node.title,
        sku: node.sku,
        variantTitle: node.variantTitle,
        weight: node.variant.weight,
      }))
    )[0];

    return res.json({
      status: 200,
      data: {
        userInfo,
        shippingInfo,
        orders,
      },
    });
  } catch (err) {
    return res.json({
      status: 500,
      data: err,
    });
  }
});

/***
 *  When the customer completes the process this endpoint will send the data from the database to shippo to create the label
 */
app.get("/api/publish-label", async (req, res) => {
  try {
    const addressFrom = {
      name: "1600",
      street1: "215 Clayton St.",
      city: "San Francisco",
      state: "CA",
      zip: "94117",
      country: "US",
    };

    const addressTo = {
      name: "Mr Hippo",
      street1: "Broadway 1",
      city: "New York",
      state: "NY",
      zip: "10007",
      country: "US",
    };

    const parcel = {
      length: "5",
      width: "5",
      height: "5",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    };

    const sendLabels = await createAndSendLabel(addressFrom, addressTo, parcel);

    return res.json({
      status: 200,
      data: sendLabels,
    });
  } catch (err) {
    return res.json({
      status: 500,
      data: err,
    });
  }
});

/** Home screen route */
app.get("/", (req, res) => {
  return res.json({
    status: 200,
    message: "Working server"
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
