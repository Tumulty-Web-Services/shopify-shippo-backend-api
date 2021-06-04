const shippo = require("shippo")(process.env.SHIPPO_KEY);

function createAndSendLabel(addressFrom, addressTo, parcel) {
  return shippo.shipment.create(
    {
      address_from: addressFrom,
      address_to: addressTo,
      parcels: [parcel],
      async: false,
    },
    function (err, shipment) {
      if (err) {
        console.log('error');
        console.log(err);
        return err;
      }

      return shipment;
    }
  );
}

module.exports = createAndSendLabel;
