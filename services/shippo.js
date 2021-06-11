const shippo = require("shippo")(process.env.SHIPPO_KEY);

function createAndSendLabel(shipment) {
  return shippo.transaction.create({
    "shipment": shipment,
    "carrier_account": "078870331023437cb917f5187429b093",
    "servicelevel_token": "usps_priority"
}, function(err, transaction) {
    if(err) {
      console.error(err);
      return err;
    }

    return transaction;
});
}

module.exports = createAndSendLabel;
