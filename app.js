import express from "express"
import session from "express-session"
import dotenv from "dotenv"
import authRoutes from "./src/routes/authRoutes.js"
import path from "path"


dotenv.config()
const app = express()
const port  = process.env.PORT || 3000

//configuração para o middleware de sessão
app.use(session({
    secret: "kaiomarcio",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/auth", authRoutes)

app.use(express.static("src/public"))


app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/login.html'));
})



app.listen(3000, () => console.log("Server running on port 3000"))  