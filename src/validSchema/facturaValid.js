export const facturaValidSchema = {
  body: {
    type: "object",
    required: ["product", "quantity"],
    properties: {
      product: {
        type: "string",
        minLength: 5,
      },
      quantity: {
        type: "number",
      },
      total: {
        type: "number",
        default: 0,
      },
    },
  },
};
