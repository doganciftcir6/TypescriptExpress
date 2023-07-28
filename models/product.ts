import {
  Table,
  Column,
  Model,
  BelongsToMany,
} from "sequelize-typescript";
import Category from "./category";
import ProductCategory from "./productcategory";

@Table
class Product extends Model {
  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  price!: number;

  @Column
  status!: boolean;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories!: Category[];
}

export default Product;
