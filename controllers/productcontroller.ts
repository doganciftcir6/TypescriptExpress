import { Request, Response } from "express";
import Product from "../models/product";

//GetAllProduct
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  return res.status(200).json(products);
};

//GetByIdProduct
export const getProductById = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ message: "Product is not found." });
  }

  return res.status(200).json(product);
};

//InsertProduct
export const insertProduct = async (req: Request, res: Response) => {
  const { name, description, price, status } = req.body;

  await Product.create({
    name,
    description,
    price,
    status,
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//UpdateProduct
export const updateProduct = async (req: Request, res: Response) => {
  //id bodyden gelecek önce bu idli kayıt db de var mı kontrol.
  const updatedProduct = req.body;
  const oldProduct = await Product.findByPk(updatedProduct.id);
  if (!oldProduct) {
    return res.status(404).json("Product is not found.");
  }
  //kayıt var update yapılır
  await Product.update(updatedProduct, { where: { id: updatedProduct.id } })
    .then(() =>
      res
        .status(200)
        .json(`${updatedProduct.id} product with ID successfully updated.`)
    )
    .catch((err) => res.status(500).json(err));
};

//DeleteProduct
export const deleteProduct = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;
  //bu idye sahip kayıt db de var mı kontrol
  const oldProduct = Product.findByPk(id);
  if (!oldProduct) return res.status(404).json("Product is not found.");
  //kayıt var silme işlemi
  Product.destroy({ where: { id } }).then(() =>
    res.status(200).json(`${id} Product with ID successfully deleted.`)
  );
};
