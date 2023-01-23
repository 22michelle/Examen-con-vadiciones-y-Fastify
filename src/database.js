import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const uri =
"mongodb+srv://prueba:prueba@cluster0.noyz2br.mongodb.net/Examen";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log("Base de datos conectada", db.connection.name);
  } catch (error) {
    console.log(`Error al conectar a la base de datos ${error.message}`);
  }
};
