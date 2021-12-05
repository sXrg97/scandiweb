const getProduct = async (productId) => {
  try {
    if (productId) {
      const data = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
{
  product(id: "${productId}"){
    name
    gallery
    description
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency
      amount
    }
    brand    
  }
}
`,
        }),
      });
      const res = await data.json();
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

export default getProduct;
