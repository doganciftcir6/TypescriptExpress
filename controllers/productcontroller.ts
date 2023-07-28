import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";

//GetAllProduct
const getAllProducts = async (req: Request, res: Response) => {
  await Product.findAll({ include: [Category] })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};

//GetByIdProduct
const getProductById = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;

  await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["name", "status"],
    },
    attributes: ["id", "name", "price"],
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product is not found." });
      }
      //kayıt dbde mevcut
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};

//InsertProduct
const insertProduct = async (req: Request, res: Response) => {
  const { name, description, price, status, categoryId } = req.body;

  const newProduct = await Product.create({
    name,
    description,
    price,
    status,
  })
    .then((newProduct) => {
      // Kategori ID verilmiş mi?
      if (!categoryId) {
        return res.status(400).json({ message: "Kategori ID gereklidir." });
      }

      // Verilen kategori ID ile eşleşen bir kategori var mı?
      return Category.findByPk(categoryId).then((category) => {
        if (!category) {
          return res.status(404).json({ message: "Kategori bulunamadı." });
        }

        // Eşleşen kategori var ise, yeni ürün ile kategori arasında ilişki oluştur
        return newProduct.$add("categories", category).then(() => {
          // İşlem başarılıysa 201 Created cevabı dön
          return res.status(201).json({ message: "Ürün başarıyla eklendi." });
        });
      });
    })
    .catch((error) => {
      // Hata durumunda 500 Internal Server Error dön
      console.error("Hata oluştu:", error);
      return res
        .status(500)
        .json({ message: "İşlem sırasında bir hata oluştu." });
    });
};

//UpdateProduct
const updateProduct = async (req: Request, res: Response) => {
  //id bodyden gelecek önce bu idli kayıt db de var mı kontrol.
  const updatedProduct = req.body;
  const oldProduct = await Product.findByPk(updatedProduct.id);
  if (!oldProduct) {
    return res.status(404).json({ message: "Product is not found." });
  }
  //kayıt var update yapılır
  await Product.update(updatedProduct, { where: { id: updatedProduct.id } })
    .then(() =>
      res.status(200).json({
        message: `${updatedProduct.id} Product with ID successfully updated.`,
      })
    )
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

//DeleteProduct
const deleteProduct = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;
  //bu idye sahip kayıt db de var mı kontrol
  const oldProduct = await Product.findByPk(id);
  if (!oldProduct)
    return res.status(404).json({ message: "Product is not found." });
  //kayıt var silme işlemi
  await Product.destroy({ where: { id } })
    .then(() =>
      res
        .status(200)
        .json({ message: `${id} Product with ID successfully deleted.` })
    )
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

export default {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
