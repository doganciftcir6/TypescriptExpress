import { Sequelize } from "sequelize-typescript";
import config from "./config";
import Product from "../../models/product";
import Category from "../../models/category";
import ProductCategory from "../../models/productcategory";
import AppUser from "../../models/appuser";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

sequelize.addModels([Product, Category, ProductCategory, AppUser]);

export default sequelize;
