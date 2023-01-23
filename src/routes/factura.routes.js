import facturaCtrl from "../controllers/Factura.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { facturaValidSchema } from "../validSchema/facturaValid.js";

// Corregir el error de middleware
const middleware = (req, reply, done) => {
  verifyToken(req, reply, done);
};

export const facturaRoutes = (fastify, opts, done) => {
  // RUTAS con validaciones
  fastify.get("/", facturaCtrl.list);
  fastify.get("/:id", facturaCtrl.listById);
  fastify.post("/", {schema: facturaValidSchema, preValidation: [middleware]}, facturaCtrl.create);
  fastify.delete("/:id", {preHandler: [middleware]}, facturaCtrl.delete);
  fastify.put("/:id", {schema: facturaValidSchema, preValidation: [middleware]}, facturaCtrl.update);

  done();
};
