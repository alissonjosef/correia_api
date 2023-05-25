import { ObjectId } from "mongodb";

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

  deleteProduct: async (req: any, res: any) => {
    const productId = req.params.id;

    try {
      const result = await ProductModel.deleteOne({
        _id: new ObjectId(productId),
      });

      if (result.deletedCount === 1) {
        res.status(200).json({ msg: "Documento deletado com sucesso." });
      } else {
        res.status(404).json({ error: "Documento não encontrado." });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: serviceController.ts:26 ~ getAll: ~ error:",
        error
      );
    }
  },

  updateProduct: async (req: any, res: any) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    try {
      const serverUrl = `${req.protocol}://${req.headers.host}`;

      let imageUrl = "";
      if (req.file) {
        const imagePath = req.file.path;
        imageUrl = url.resolve(serverUrl, imagePath);
      }

      const result = await ProductModel.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $set: {
            ...updatedProduct,
            imageUrl: imageUrl || updatedProduct.imageUrl,
          },
        }
      );

      if (result.matchedCount === 1) {
        res.status(200).json({ msg: "Documento atualizado com sucesso." });
      } else {
        res.status(404).json({ error: "Documento não encontrado." });
      }
    } catch (error) {
      console.log("Erro ao atualizar documento:", error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar o documento." });
    }
  },
};
