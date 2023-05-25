//const Picture = require("../models/Picture");
const { Product: ProductModel } = require("../models/Product");
const url = require("url");

export const serviceController = {
  create: async (req: any, res: any) => {
    try {
      const serverUrl = `${req.protocol}://${req.headers.host}`;

      const imagePath = req.file.path;

      const imageUrl = url.resolve(serverUrl, imagePath);

      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl,
        enabled: req.body.enabled,
      };

      const response = await ProductModel.create(product);

      res.status(200).json({ response, msg: "Pedido criado com sucesso!" });
    } catch (error) {
      console.log("🚀 Erro ao fazer acriação", error);
    }
  },

  getAll: async (req: any, res: any) => {
    try {
      const product = await ProductModel.find();

      res.status(200).json(product);
    } catch (error) {
      console.log(
        "🚀 ~ file: serviceController.ts:26 ~ getAll: ~ error:",
        error
      );
    }
  },
};
