import cloudinary from "./cloudinary.config.js";
import { deleteImg } from "./deleteImg.js";

export const subirImageACloudinary = async (file) => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path
    );
    deleteImg(file.filename);
    return {
      secure_url,
      public_id,
    };
  } catch (error) {
    console.log("error en subirImageACloudinary", error.message);
  }
};

export const eliminarImagenCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log("error en eliminarImagenCloudinary", error.message);
  }
};
