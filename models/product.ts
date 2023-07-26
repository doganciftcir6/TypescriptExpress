import { DataTypes, Model } from "sequelize";
import sequelize from "../helpers/dbhelpers/connection";
import Category from './category';
import IProduct from "./interfaces/productInterface";

class Product extends Model<IProduct> implements IProduct {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public status!: boolean;
}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

// Product ve Category arasındaki çoka-çok ilişkisi
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

export default Product;
