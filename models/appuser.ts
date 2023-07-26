import { DataTypes, Model } from "sequelize";
import sequelize from "../helpers/dbhelpers/connection";
import bcrypt from "bcrypt";
import IAppUser from "./interfaces/userInterface";

class AppUser extends Model<IAppUser> implements IAppUser{
    public id!: number;
    public username!: string;
    email!: string;
    password!: string;
}

AppUser.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "AppUser",
    }
);

//Kullanıcının create olma durumunda şifresini dbye hashleyerek kayıt et
//db işlemi olduğu için uzun süren bir işlem dolayısıyla asekron olmalı
AppUser.beforeCreate(async  (user: AppUser) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

export default AppUser