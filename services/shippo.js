const shippo = require("shippo")(process.env.SHIPPO_KEY);

async function createAndSendLabel(shipment) {
  const { address_from, address_to, parcels } = shipment;

  return shippo.shipment.create(
    {
      address_from: address_from,
      address_to: address_to,
      parcels: [parcels],
      async: false,
    },
    function (err, shipment) {
      if (err) {
        console.error(err);
      }

      // Get the first rate in the rates results.
      // Customize this based on your business logic.
      const rate = shipment.rates[0];

      // Purchase the desired rate.
      return shippo.transaction.create(
        {
          rate: rate.object_id,
          label_file_type: "PDF",
          async: false,
        },
        function (err, transaction) {
          if(err) {
            console.error(err);
            console.log(transaction);
            return transaction;
          }
        }
      );     
    }
  );
}

module.exports = createAndSendLabel;
