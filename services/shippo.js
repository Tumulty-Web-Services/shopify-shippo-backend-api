const shippo = require("shippo")(process.env.SHIPPO_KEY);

async function createAndSendLabel(shipment) {
  const { address_from, address_to, parcels } = shipment;

  const shipmentReq = await shippo.shipment.create({
    address_from: address_from,
    address_to: address_to,
    address_return: address_from,
    parcels: [parcels],
    extra: {"is_return": true},
    async: false,
  });

  const rate = shipmentReq.rates.sort((a, b) => ( a.amount > b.amount) ?  1 : -1)[0];

  return shippo.transaction.create({
    "rate": rate.object_id,
    "label_file_type": "PDF",
    "async": false
  }, function (err, transaction) {
    if (err) {
      console.error(err)
    }

    return transaction
  });
}

module.exports = createAndSendLabel;
