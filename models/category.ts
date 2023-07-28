import { Table, Column, Model, BelongsToMany } from "sequelize-typescript";
import Product from "./product";
import ProductCategory from "./productcategory";

@Table
class Category extends Model {
  @Column
  name!: string;

  @Column
  status!: boolean;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[];
}

export default Category;
