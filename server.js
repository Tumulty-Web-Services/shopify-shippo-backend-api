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
    const { 
      name,
      company,
      addressOne,
      addressTwo,
      city,
      state,
      phone,
      zip,
      email,
      country 
     } = req.body;


    const addressTo = {
      "name": name,
      "company":company,
      "street1":addressOne,
      "street2": addressTwo,
      "city":city,
      "state":state,
      "zip":zip,
      "country":country,
      "phone":phone,
      "email":email,
    };


    // cubbie kit address
    const addressFrom = {
      "name":process.env.CUBBIEKIT_NAME,
      "company":process.env.CUBBIEKIT_COMPANY,
      "street1":process.env.CUBBIEKIT_STREET,
      "city":process.env.CUBBIEKIT_CITY,
      "state":process.env.CUBBIEKIT_STATE,
      "zip":process.env.CUBBIEKIT_ZIP,
      "country": process.env.CUBBIEKIT_COUNTRY,
      "phone":process.env.CUBBIEKIT_PHONE,
      "email":process.env.CUBBIEKIT_EMAIL,
    };


    let parcel = 
    {
      length: "12",
      width: "8",
      height: "2.5",
      distance_unit: "in",
      weight: "12",
      mass_unit: "oz",        
    };

    if (order.length >= 4) {
      parcel = {
        length: "8",
        width: "6",
        height: "2.5",
        distance_unit: "in",
        weight: "6",
        mass_unit: "oz",
      };
    }

    const shipment = {
      address_from: addressFrom,
      address_to: addressTo,
      parcels: parcel,
    };
    
    /** refactor this to get only send back the label */
    const sendLabels = await createAndSendLabel(shipment);
    console.log(sendLabels);
    /** The email function will go here...  */
    return res.json({ sendLabels });

  } catch (err) {
    return res.json({
      status: 500,
      data: err,
    });
  }
});

/** Home screen route */
app.get("/", (_, res) => {
  return res.json({
    status: 200,
    message: "Working server",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
