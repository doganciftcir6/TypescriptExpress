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
const insertProduct = (req: Request, res: Response) => {
  const { name, description, price, status, categoryId } = req.body;

  //kullanıcı categoryid yollamış mı diye kontrol
  if (!categoryId) {
    return res.status(400).json({ message: "Please enter the categoryId." });
  }

  //kullanıcı categoryid yolladıysa bu idye sahip kayıt category tablosunda var mı diye kontrol
  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category is not found." });
      }

      //ilgili categoryid'ye sahip kayıt category tablosunda varmış, product ekleme işlemine geç
      return Product.create({
        name,
        description,
        price,
        status,
      }).then((newProduct) => {
        //many to many tablosuna ilgili verileri ekleyerek orada bir kayıt oluştur.
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
const updateProduct = (req: Request, res: Response) => {
  //id isteğin body'sinden gelecek
  const updatedProduct = req.body;

  //bu id'ye sahip kayıt product tablosunda var mı kontrol
  Product.findByPk(updatedProduct.id)
    .then((oldProduct) => {
      if (!oldProduct) {
        return res.status(404).json({ message: "Product is not found." });
      }

      //kullanıcı güncelleme verilerinde categoryId girmiş mi diye kontrol
      if (!updatedProduct.categoryId) {
        return res.status(400).json({ message: "Please enter the categoryId." });
      }

      //kullanıcı categoryId girmiş ama bu id'ye sahip kayıt Category tablosunda var mı diye kontrol
      return Category.findByPk(updatedProduct.categoryId).then((category) => {
        if (!category) {
          return res.status(404).json({ message: "Category is not found." });
        }

        //kayıt Category tablosunda varmış, product güncelleme işlemine geç
        return Product.update(updatedProduct, { where: { id: updatedProduct.id } })
          .then(() => {
            //many to many tablosunda ilgili yeni verilerle oradaki kayıtı güncelle
            return oldProduct.$set("categories", category).then(() => {
              return res.status(200).json({
                message: `${updatedProduct.id} Product with ID successfully updated.`,
              });
            });
          })
          .catch((err) => res.status(500).json({ message: `${err}` }));
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
      res
        .status(200)
        .json({
          message: `Product with ID ${id} has been successfully deleted.`,
        })
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
