export const productValidSchema = {
  body: {
    type: "object",
    required: ["name", "description", "rate", "price", "stock", "category"],
    properties: {
      name: {
        type: "string",
        minLength: 5,
      },
      description: {
        type: "string",
        minLength: 10,
      },
      rate: {
        type: "number",
        minimum: 0,
        maximum: 5,
        default: 0,
      },
      price: {
        type: "number",
      },
      stock: {
        type: "number",
        default: 0,
      },
      category: {
        type: "string",
      },
    },
  },
};
