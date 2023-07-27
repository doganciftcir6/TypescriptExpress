import { DataTypes, Model } from "sequelize";
import sequelize from "../helpers/dbhelpers/connection";
import ICategory from "./interfaces/categoryinterface";

class Category extends Model<ICategory> implements ICategory {
  id!: number;
  name!: string;
  status!: boolean;
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

export default Category
