import { Request, Response } from "express";
import Category from "../models/category";

//GetAllCategory
const getAllCategories = async (req: Request, res: Response) => {
  await Category.findAll()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//GetByIdCategory
const getCategoryById = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;

  await Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category is not found." });
      }
      //kayıt dbde mevcut
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//InsertCategory
const insertCategory = async (req: Request, res: Response) => {
  const { name, status } = req.body;

  await Category.create({
    name,
    status,
  })
    .then((newCategory) => {
      res.status(200).json(newCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//UpdateCategory
const updateCatgory = async (req: Request, res: Response) => {
  //id bodyden gelecek önce bu idli kayıt db de var mı kontrol.
  const updatedCategory = req.body;
  const oldCategory = await Category.findByPk(updatedCategory.id);
  if (!oldCategory) {
    return res.status(404).json("Category is not found.");
  }
  //kayıt var update yapılır
  await Category.update(updatedCategory, { where: { id: updatedCategory.id } })
    .then(() => {
      res
        .status(200)
        .json(`${updatedCategory.id} Category with ID successfully updated.`);
    })
    .catch((err) => res.status(500).json(err));
};

//DeleteCategory
const deleteCategory = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;
  //bu idye sahip kayıt db de var mı kontrol
  const oldCategory = await Category.findByPk(id);
  if (!oldCategory) {
    return res.status(404).json("Category is not found.");
  }
  //kayıt var silme işlemi
  await Category.destroy({ where: { id } })
    .then(() => {
      res.status(200).json(`${id} Category with ID successfully deleted.`);
    })
    .catch((err) => res.status(500).json(err));
};

export default {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCatgory,
  deleteCategory,
};
