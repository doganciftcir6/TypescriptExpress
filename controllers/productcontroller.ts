import { Request, Response } from "express";
import Product from "../models/product";

//GetAllProduct
const getAllProducts = async (req: Request, res: Response) => {
  await Product.findAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//GetByIdProduct
const getProductById = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;

  await Product.findByPk(id).catch((product) => {
    if (!product) {
      return res.status(404).json({ message: "Product is not found." });
    }
    //kayıt dbde mevcut
    res.status(200).json(product);
  });
};

//InsertProduct
const insertProduct = async (req: Request, res: Response) => {
  const { name, description, price, status } = req.body;

  await Product.create({
    name,
    description,
    price,
    status,
  })
    .then((newProduct) => {
      res.status(200).json(newProduct);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//UpdateProduct
const updateProduct = async (req: Request, res: Response) => {
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
        .json(`${updatedProduct.id} Product with ID successfully updated.`)
    )
    .catch((err) => res.status(500).json(err));
};

//DeleteProduct
const deleteProduct = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;
  //bu idye sahip kayıt db de var mı kontrol
  const oldProduct = await Product.findByPk(id);
  if (!oldProduct) return res.status(404).json("Product is not found.");
  //kayıt var silme işlemi
  await Product.destroy({ where: { id } }).then(() =>
    res.status(200).json(`${id} Product with ID successfully deleted.`)
  ).catch((err) => res.status(500).json(err));
};

export default {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
