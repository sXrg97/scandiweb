const getData = async (query) => {
  try {
    if (query && query !== "all") {
      const data = await fetch("http://192.168.100.2:4000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
{
    category(input: {title: "${query}"}){
    name
    products {
      id
      name
      brand
      inStock
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
      gallery
      description
    }
  }
}
`,
        }),
      });
      const res = await data.json();
      return res;
    } else {
      const data = await fetch("http://192.168.100.2:4000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
{
  	category{
    name
    products {
      id
      name
      brand
      inStock
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
      gallery
      description
    }
  }
}
`,
        }),
      });
      const res = await data.json();
      return res;
    }
  } catch (error) {
    console.error(error);
  }
};
export default getData;
