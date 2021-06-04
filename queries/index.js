const queryOrderName = (id) => `
  query {
    orders(first: 1, query:"name:'$${id}'"){
      edges{
          node
          {
          id
          name
          lineItems(first: 250) {
            edges{
                node{
                id
                title
                sku
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
