import express, { Request, Response } from "express";
import db from "../helpers/dbhelpers/connection";
import cors from "cors";
import appUserRoutes from "../routes/appUserRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import productRoutes from "../routes/productRoutes";
import productCategoryRoutes from "../routes/productCategoryRoutes";

//uygulama oluştur
const app = express();

//port
const port = 4000;

//db bağlantısı başarılıysa serveri dinle
db.authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log("4000 is running and db connection is success..");
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
