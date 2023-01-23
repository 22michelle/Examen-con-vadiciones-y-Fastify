import { response } from "../helpers/Response.js";
import { facturaModel } from "../models/Factura.js";
import { productModel } from "../models/Product.js";
import mongooseErrorHandler from "mongoose-validation-error-message-handler";

const facturaCtrl = {};

facturaCtrl.create = async (req, reply) => {
  try {
    const { product, quantity } = req.body;
    const productEncontrado = await productModel.findById({ _id: product });
    if (!productEncontrado) {
      return response(reply, 404, false, "", "El producto no existe");
    }

    if (quantity > productEncontrado.stock) {
      return response(
        reply,
        400,
        false,
        "",
        `La cantidad que desea comprar no esta disponible, el producto tiene un valor de ${productEncontrado.stock} `
      );
    }

    await productEncontrado.updateOne({
      stock: productEncontrado.stock - quantity,
    });

    const factura = new facturaModel({
      ...req.body,
      user: req.userId,
      total: productEncontrado.price * quantity,
    });

    await factura.save();
    response(reply, 201, true, factura, "Factura creada");
  } catch (error) {
    const errorValidation = mongooseErrorHandler(error);
    errorValidation.name === "MongooseValidatorError"
      ? response(reply, 400, false, "", error.message)
      : response(reply, 500, false, "", error.message);
  }
};

facturaCtrl.list = async (req, reply) => {
  try {
    const data = await facturaModel
      .find()
      .populate("product")
      .populate("user", "-password");
    response(reply, 200, true, data, "Lista de facturas");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

facturaCtrl.listById = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await facturaModel
      .findById(id)
      .populate("product")
      .populate("user", "-password");
    if (!data) {
      return response(reply, 404, false, "", "Factura no encontrado");
    }
    response(reply, 200, true, data, "Factura encontrada");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

facturaCtrl.delete = async (req, reply) => {
  try {
    const { id } = req.params;
    const factura = await facturaModel.findById(id);
    if (!factura) {
      return response(reply, 404, false, "", "Factura no encontrada");
    }

    const productEncontrado = await productModel.findById({
      _id: factura.product,
    });

    if (!productEncontrado) {
      return response(reply, 404, false, "", "La factura no existe");
    }

    await productEncontrado.updateOne({
      stock: productEncontrado.stock + factura.quantity,
    });

    await factura.deleteOne();
    response(reply, 200, true, "", "Factura eliminada");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

facturaCtrl.update = async (req, reply) => {
  try {
    const { id } = req.params;
    const { product, quantity } = req.body;

    const factura = await facturaModel.findById(id);
    if (!factura) {
      return response(reply, 404, false, "", "Factura no encontrada");
    }

    const producto = await productModel.findById({
      _id: factura.product,
    });


    if (product !== factura.product.toString()) {
    
      const productEncontrado = await productModel.findById({ _id: product });
     
      if (!productEncontrado) {
        return response(
          reply,
          404,
          false,
          "",
          "El producto no existe"
        );
      }

    
      await producto.updateOne({
        stock: producto.stock + factura.quantity,
      });

      if (quantity > productEncontrado.stock) {
        return response(
          reply,
          400,
          false,
          "",
          `La cantidad que desea comprar no esta disponible`
        );
      }
  
      await productEncontrado.updateOne({
        stock: productEncontrado.stock - quantity,
      });

      await factura.updateOne({
        ...req.body,
        user: req.userId,
        total: productEncontrado.price * quantity,
      });
    } else {
      
      if (quantity > producto.stock + factura.quantity) {
        return response(
          reply,
          400,
          false,
          "",
          `La cantidad que desea comprar no esta disponible`
        );
      }

      await producto.updateOne({
        stock: producto.stock + factura.quantity - quantity,
      });


      await factura.updateOne({
        ...req.body,
        user: req.userId,
        total: producto.price * quantity,
      });
    }
    response(reply, 200, true, "", "factura actualizada");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default facturaCtrl;
