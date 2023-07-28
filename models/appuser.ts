import { Table, Column, Model } from "sequelize-typescript";

@Table
class AppUser extends Model {
  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;
}

export default AppUser;
