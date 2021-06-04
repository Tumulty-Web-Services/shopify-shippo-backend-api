const queryOrderName = (id) => `
query {
  orders(first: 1, query:"name:'$${id}'"){
    edges{
      node
      {
        id
        name     
        email
        shippingAddress {
          id
          address1
          city
          country
          zip
          province
        }
        lineItems(first: 250) {
          edges{
            node{
              id
              title
              sku
              variantTitle
            
              variant{
                id
              }
            }
          }
        }
      }
    }

  }
}
`;

module.exports = {
  queryOrderName
}
