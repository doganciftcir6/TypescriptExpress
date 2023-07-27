import express, { Request, Response } from "express";
import db from "../helpers/dbhelpers/connection";
import cors from "cors";
import dotenv from "dotenv";
import appUserRoutes from "../routes/appUserRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import productRoutes from "../routes/productRoutes";
import productCategoryRoutes from "../routes/productCategoryRoutes";

//uygulama oluştur
const app = express();

//env kullan
dotenv.config();

//db bağlantısı başarılıysa serveri dinle
db.authenticate()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "The server is running, and the database connection is successful.."
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(cors()); // CORS izinleri için
app.use(express.json()); //kullanıcının isteğin bodysinden gönderdiği bilgileri okumak için

//route
app.use("/api/appusers", appUserRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/productCategories", productCategoryRoutes);
