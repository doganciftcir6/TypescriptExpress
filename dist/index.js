"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//uygulama oluştur
var app = (0, express_1.default)();
//router oluştur
var router = express_1.default.Router();
//route
router.get("/user", function (req, res) {
    //fake datayı doldur ve response olarak gönder
    var arr = [{ ad: "Ali", id: "1", soyad: "Uçar" }, { ad: "Ayşe", id: "2", soyad: "Uçar" }];
    res.status(200).json("arr");
});
//serveri dinle
app.listen(3001, function () {
    console.log("3001");
});
