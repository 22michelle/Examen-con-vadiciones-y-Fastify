export const categoryValidSchema = {
  body: {
    type: "object",
    required: ["name", "description"],
    properties: {
      name: {
        type: "string",
        minLength: 5,
      },
      description: {
        type: "string",
        minLength: 10,
      },
    },
  },
};
