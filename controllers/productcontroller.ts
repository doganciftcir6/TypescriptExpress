import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";

//GetAllProduct
const getAllProducts = async (req: Request, res: Response) => {
  await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["name", "status"], //sadece cateogry tablosundaki name ve status alanları gelsin.
      },
    ],
  })
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
    include: [
      {
        model: Category,
        attributes: ["name", "status"],
      },
    ],
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
      //categoryid var mı diye kontrol
      if (!categoryId) {
        return res
          .status(400)
          .json({ message: "Please enter the categoryId." });
      }

      //girilen categoryid'ye sahip kayıt category tablosunda var mı kontrolü
      return Category.findByPk(categoryId).then((category) => {
        if (!category) {
          return res.status(404).json({ message: "Category is not found." });
        }

        //kategori dbde var, manytomany ilişki tablosuna bu categoryi ekle.
        return newProduct.$add("categories", category).then(() => {
          return res.status(200).json({
            message: `${newProduct.id} Product with ID successfully added.`,
          });
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: `${err}` });
    });
};

//UpdateProduct
const updateProduct = async (req: Request, res: Response) => {
  //id isteğin bodysinden gelecek
  const updatedProduct = req.body;
  //bu id ye sahip kayıt product tablosunda var mı kontrol
  const oldProduct = await Product.findByPk(updatedProduct.id);
  if (!oldProduct) {
    return res.status(404).json({ message: "Product is not found." });
  }

  //kayıt var update işlemine geç
  await Product.update(updatedProduct, { where: { id: updatedProduct.id } })
    .then(async () => {
      //kullanıcı update sırasınca categoryId değeri girmeli
      if (!updatedProduct.categoryId) {
        return res
          .status(400)
          .json({ message: "Please enter the categoryId." });
      }

      //kullanıcının girdiği categoryId Category tablosunda varmı kontrol
      const category = await Category.findByPk(updatedProduct.categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category is not found." });
      }

      //eğer kayıt varsa many to many tablosunda ilgili category kaydını yenisiyle güncelle
      return oldProduct.$set("categories", category).then(() => {
        return res.status(200).json({
          message: `${updatedProduct.id} Product with ID successfully updated.`,
        });
      });
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

//DeleteProduct
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  //kullanıcının verdiği idye sahip kayıt dbde var mı
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ message: "Product is not found." });
  }

  //product ile categori arasındaki ilişkileri kaldır
  await product.$set("categories", []);

  //ilişki kalktı kayıdı sil
  await Product.destroy({ where: { id } })
    .then(() =>
      res.status(200).json({ message: `Product with ID ${id} has been successfully deleted.`})
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
