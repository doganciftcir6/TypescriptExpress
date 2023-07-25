import express, {Request,Response} from "express"

//uygulama oluştur
const app = express();
//port
const port = 4000;

//router oluştur
const router = express.Router();

//fake data interfacei
interface User{
    id: string
    ad: string
    soyad: string
}

//route
router.get("/user", (req:Request, res:Response) => {
    //fake datayı doldur ve response olarak gönder
    const arr:User[] = [{ad:"Ali", id:"1", soyad:"Uçar"}, {ad:"Ayşe", id:"2", soyad:"Uçar"}];
    res.status(200).json(arr); 
});
router.post("/user", (req:Request, res:Response) => {
    const obj:User = {ad:"Yasin", soyad:"Dalkılıç", id:"5"};
    res.status(201).json(obj);
});

app.use("/", router);
//serveri dinle
app.listen(port, () => {
    console.log("4000 is running..");
});