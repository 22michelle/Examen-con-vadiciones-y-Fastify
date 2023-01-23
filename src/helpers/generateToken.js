import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, "abc123", {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.log("error en generateToken", error.message);
  }
};
