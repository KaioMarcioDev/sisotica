import express from "express"
import { login, logout, register} from "../controllers/authController.js"
import { requireLogin, restrictToRole } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: 'src/views' });
});

router.post("/login", login)
router.post("/logout", logout)
router.post("/register", register)

//rotas protegidas
router.get("/admin_master", requireLogin, restrictToRole("admin_master"), (req, res) => {
    res.sendFile('admin_master.html', { root: 'src/views' })
})
router.get("/admin_funcionario", requireLogin, restrictToRole("admin_funcionario"), (req, res) =>{
    res.sendFile('admin_funcionario.html', { root: 'src/views' });
    })
router.get("/admin_cliente", requireLogin, restrictToRole("admin_cliente"), (req, res) =>{
    console.log("Sessão válida para admin_cliente:", req.session);
    res.sendFile('admin_cliente.html', { root: 'src/views' });
})
export default router




