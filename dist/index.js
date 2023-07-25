"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//uygulama oluştur
var app = (0, express_1.default)();
//port
var port = 4000;
//router oluştur
var router = express_1.default.Router();
//route
router.get("/user", function (req, res) {
    //fake datayı doldur ve response olarak gönder
    var arr = [{ ad: "Ali", id: "1", soyad: "Uçar" }, { ad: "Ayşe", id: "2", soyad: "Uçar" }];
    res.status(200).json(arr);
});
router.post("/user", function (req, res) {
    var obj = { ad: "Yasin", soyad: "Dalkılıç", id: "5" };
    res.status(201).json(obj);
});
app.use("/", router);
//serveri dinle
app.listen(port, function () {
    console.log("4000 is running..");
});
