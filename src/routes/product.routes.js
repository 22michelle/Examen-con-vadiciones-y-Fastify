import productCtrl from "../controllers/Product.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from "../middlewares/imgUpload.js";
import { productValidSchema } from "../validSchema/productValid.js";

const middleware = (req, reply, done) => {
  verifyToken(req, reply, done);
};

export const productRoutes = (fastify, opts, done) => {
  // RUTAS con validaciones
  fastify.get("/", { preHandler: [middleware] }, productCtrl.list);
  fastify.get("/:id", { preHandler: [middleware] }, productCtrl.listById);
  fastify.post(
    "/",
    {
      schema: productValidSchema,
      preValidation: [middleware, upload.single("img")],
    },
    productCtrl.create
  );
  fastify.delete("/:id", { preHandler: [middleware] }, productCtrl.delete);
  fastify.put(
    "/:id",
    {
      schema: productValidSchema,
      preValidation: [middleware, upload.single("img")],
    },
    productCtrl.update
  );

  done();
};
