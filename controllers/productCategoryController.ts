import { Request, Response } from "express";
import ProductCategory from "../models/productcategory";
import Product from "../models/product";
import Category from "../models/category";

//GetAllProductCategory
//include ile ilişkili olan product ve category bilgilerinin doldurulmasını sağla.
const getAllProductCategories = async (req: Request, res: Response) => {
  await ProductCategory.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "name", "price"], // Sadece id, name ve price alanlarını döndür
      },
      {
        model: Category,
        attributes: ["id", "name"], // Sadece id ve name alanlarını döndür
      },
    ],
  })
    .then((productCategories) => {
      res.status(200).json(productCategories);
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

//GetByIdProductCategory
const getProductCategoryById = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;

  await ProductCategory.findByPk(id, {
    include: [
      {
        model: Product,
        attributes: ["id", "name", "price"],
      },
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((productCategory) => {
      if (!productCategory)
        return res
          .status(404)
          .json({ message: "ProductCategory is not found." });
      //kayıt dbde mevcut
      res.status(200).json(productCategory);
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

//InsertProductCategory
const insertProductCategory = async (req: Request, res: Response) => {
  const { productId, categoryId } = req.body;

  //önce kullanıcının verdiği productId ve categoryId dbde mevcut mu kontrol et
  const product = await Product.findByPk(productId);
  const category = await Category.findByPk(categoryId);
  if (!product || !category) {
    return res.status(404).json({ message: "Product or Category not found" });
  }
  //productId ve categoryId dbde mevcut
  await ProductCategory.create({
    productId,
    categoryId,
  })
    .then((newProductCategory) => {
      res.status(200).json(newProductCategory);
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

//UpdateProductCategory
const updateProductCategory = async (req: Request, res: Response) => {
  //id bodyden gelecek hem bu idli kayıt dbde var mı diye kontrol hem de kullanıcının verdiği productId ve categoryId dbde mevcut mu kontrol
  const updatedProductCategory = req.body;
  const oldProductCategory = await ProductCategory.findByPk(
    updatedProductCategory.id
  );
  if (!oldProductCategory) {
    return res.status(404).json({ message: "ProductCategory is not found." });
  }
  const product = await Product.findByPk(updatedProductCategory.productId);
  const category = await Category.findByPk(updatedProductCategory.categoryId);
  if (!product || !category) {
    return res.status(404).json({ message: "Product or Category not found" });
  }
  //kontrollerden geçildi update uygun
  await ProductCategory.update(updatedProductCategory, {
    where: { id: updatedProductCategory.id },
  })
    .then(() => {
      res.status(200).json({
        message: `${updatedProductCategory.id} ProductCategory with ID successfully updated.`,
      });
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

//DeleteProductCategory
const deleteProductCategory = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;
  //bu idye sahip kayıt db de var mı kontrol
  const oldProductCategory = await ProductCategory.findByPk(id);
  if (!oldProductCategory) {
    res.status(404).json({ message: "ProductCategory is not found." });
  }
  //kayıt var silme işlemi
  await ProductCategory.destroy({ where: { id } })
    .then(() => {
      res
        .status(200)
        .json({ message: `${id} ProductCategory with ID successfully deleted.` });
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
};

export default {
    getAllProductCategories,
    getProductCategoryById,
    insertProductCategory,
    updateProductCategory,
    deleteProductCategory,
};