import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppUser from "../models/appuser";

//Register
const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    //kayıt olmaya çalışan user daha önce kayıt olmuş mu, emaili daha önce db de var mı kontrol
    const existingUser = await AppUser.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    //email dbde yok, kullanıcının girdiği şifreyi hashle
    const hashedPassword = await hash(password, 10);

    //kullanıcıyı dbde oluştur ama şifre bilgisine hashlı bilgiyi at
    const newUser = await AppUser.create({
      username,
      email,
      password: hashedPassword,
    });

    //yeni kullanıcı bilgisini geri döndürebiliriz
    res.status(200).json({ user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: `${err}` });
  }
};

//Login
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //önce giriş yapmaya çalışan kullanıcının email bilgisi dbde var mı
    const user = await AppUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    //email bilgisi dbde varmış şimdi şifre bilgi dbdeki ile tutuyor mu
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    //email ve şifre doğru girildi token üret
    const token = jwt.sign({ user: user }, process.env.SECRET_KEY || "deneme1234567899", {
      expiresIn: "1h",
    });

    //üretilen token bilgisini geri döndür
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};

export default { register, login };
