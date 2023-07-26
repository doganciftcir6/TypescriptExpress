import { DataTypes, Model } from "sequelize";
import sequelize from "../helpers/dbhelpers/connection";
import IProductCategory from "./interfaces/productcategoryInterface";

class ProductCategory extends Model<IProductCategory> implements IProductCategory{
    id!: number;
    productId!: number;
    categoryId!: number;
}

ProductCategory.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ProductCategory",
    }
);

export default ProductCategory;