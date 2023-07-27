import { Request, Response } from "express";
import AppUser from "../models/appuser";

//GetAllAppUsers
const getAllAppUsers = async (req: Request, res: Response) => {
  await AppUser.findAll()
    .then((appUsers) => {
      res.status(200).json(appUsers);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};

//GetByIdAppUser
const getAppUser = async (req: Request, res: Response) => {
  //id parametreden gelecek
  const { id } = req.params;

  await AppUser.findByPk(id)
    .then((appUser) => {
      if (!appUser) {
        return res.status(404).json({ message: "AppUser is not found." });
      }
      res.status(200).json(appUser);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};

export default {
  getAllAppUsers,
  getAppUser,
};
