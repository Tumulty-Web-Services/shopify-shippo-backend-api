const shippo = require("shippo")(process.env.SHIPPO_KEY);

async function createAndSendLabel(shipment) {
  const { address_from, address_to, parcels } = shipment;

  return shippo.shipment.create(
    {
      address_from: address_from,
      address_to: address_to,
      address_return: address_from,
      parcels: [parcels],
      extra: {"is_return": true},
      async: false,
    },
    function (err, shipment) {
      if (err) {
        console.error(err);
      }

      // Get the first rate in the rates results.
      // Customize this based on your business logic.
      const rate = shipment.rates[0];

      // https://goshippo.com/docs/reference#carriers

      // Purchase the desired rate.
      return shippo.transaction.create(
        {
          rate: rate.object_id,
          label_file_type: "PDF",
          async: false,
          carrier_account: process.env.CARRIER_ACCOUNT_ID,
          servicelevel_token: "usps"
        },
        function (err, transaction) {
          if(err) {
            console.error(err);
            return err;
          }

          return transaction;
        }
      );     
    }
  );
}

module.exports = createAndSendLabel;
