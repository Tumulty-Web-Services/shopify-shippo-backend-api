const queryOrderName = (id) => `
query {
  orders(first: 1, query:"name:'$${id}'"){
    edges{
      node
      {
        id
        name     
        email
        phone
        shippingAddress {
          id
          name
          company
          address1
          address2
          city
          country
          zip
          province
        }
        lineItems(first: 250) {
          edges{
            node{
              title
              sku
              variantTitle
              variant{
                weight
              }
            }
          }
        }
      }
    }
  }
}
`;

module.exports = queryOrderName;
