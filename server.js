require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const queryShopify = require("./services/shopify");
const createAndSendLabel = require("./services/shippo");
const queryOrderName = require("./queries/");

const PORT = process.env.PORT || 8080;

// middleware -- some drivers to help assist with the flow of data over our routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
app.post("/api/publish-label", async (req, res) => {
  try {
    const { address, name, order, email } = req.body.customer;

    // cubbie kit address
    const addressFrom = {
      name: "Cubbiekit",
      street1: "2517 HERNANDEZ ST.",
      city: "Austin",
      state: "TX",
      zip: "78723",
      country: "US",
    };

    const addressTo = {
      name,
      street1: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: "US",
      email,
    };

    if (order.length <= 4) {
      const parcel = {
        length: "12",
        width: "8",
        height: "2.5",
        distance_unit: "in",
        weight: "2",
        mass_unit: "lb",
      };

      const shipment = {
        address_from: addressFrom,
        address_to: addressTo,
        parcels: [parcel],
      };

      const sendLabels = await createAndSendLabel(shipment);
      return res.json({
        status: 200,
        data: sendLabels,
      });
    } else {
      const parcel = {
        length: "8",
        width: "6",
        height: "3.5",
        distance_unit: "in",
        weight: "2",
        mass_unit: "lb",
      };

      const shipment = {
        address_from: addressFrom,
        address_to: addressTo,
        parcels: [parcel],
      };

      const sendLabels = await createAndSendLabel(shipment);
      return res.json({
        status: 200,
        data: sendLabels,
      });
    }
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
    message: "Working server",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
