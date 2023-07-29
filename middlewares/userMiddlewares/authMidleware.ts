import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Token ve status mesajları için ayrı objeler tanımlayın
const messages = {
  unauthorizedToken: "Unauthorized. Token not provided.",
  invalidToken: "Unauthorized. Invalid token.",
};

const statusCodes = {
  unauthorized: 401,
  forbidden: 403,
};

//bu middleware token kontrolü var mı diye bakacak eğer varsa kullanıcının tokeni ile uyuyor mu diye bakacak.
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  //kullanıcıdan token bilgisini al
  const headerToken = req.headers["authorization"];

  //eğer kullanıcı tokenı yolladıysa
  if (headerToken && headerToken.startsWith("Bearer ")) {
    //tokenın Bearer kısmından kurtulabiliriz sadece ham token kalsın
    const bearerToken = headerToken.slice(7);

    try {
      //kullanıcının verdiği token kendi tokeni ile uyuyor mu
      jwt.verify(bearerToken, process.env.SECRET_KEY || "deneme1234567899");
      next();
    } catch (error) {
      res
        .status(statusCodes.forbidden)
        .json({ message: messages.invalidToken });
    }
  } else {
    res
      .status(statusCodes.unauthorized)
      .json({ message: messages.unauthorizedToken });
  }
};

export default validateToken;
