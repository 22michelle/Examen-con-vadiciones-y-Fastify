export const userValidSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        minLength: 5,
      },
      lastname: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 12,
      },
    },
  },
};
