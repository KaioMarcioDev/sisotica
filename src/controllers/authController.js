import { findUserByEmail, verifyPassword, createUser} from "../models/usermodel.js";




export const register = async (req, res) => {
    const { nome, email, senha, nivel_acesso } = req.body;

    try {
        // Verificar se o usuário já existe
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Usuário já cadastrado" });
        }

        // Criar o novo usuário
        const newUser = await createUser(nome, email, senha, nivel_acesso);

        // Armazenar as informações do usuário na sessão
        req.session.userId = newUser.id;
        req.session.role = newUser.nivel_acesso;

        // Redirecionar de acordo com o nível de acesso
        if (nivel_acesso === 'admin_master') {
            return res.redirect('/auth/admin_master');
        } else if (nivel_acesso === 'admin_funcionario') {
            return res.redirect('/auth/admin_funcionario');
        } else if(nivel_acesso === 'admin_cliente') {
            return res.redirect('/auth/admin_cliente');
        }else{
            return res.status(400).json({ message: "Acesso não autorizado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao registrar o usuário" });
    }
};

// const login = async(req,res)=>{
//     try{
//         const {email,senha} = req.body
//         // Verificar email existe
//         const user = await findUserByEmail(email)
//         if(!user){
//             return res.status(404).json({message:"Usuário nao encontrado"})
//         }
//         // verificar sdenjh
//         const isPasswordValid  =await verifyPassword(senha, user.senha)
//         if(!isPasswordValid){
//             return res.status(401).json({message:"Senha incorreta"})
//         }
          

//         //Verifiaca sessão de usuario
//         req.session.userid = newUser.id 
//         req.session.role = newUser.nivel_acesso


//         //Redireciona conforme o nivel de acesso
//         if (user.nivel_acesso === "admin_master") {
//             return res.redirect("/admin_master");
//         } else if (user.nivel_acesso === "admin_funcionario") {
//             return res.redirect("/admin_funcionario");
//         } else if (user.nivel_acesso === "cliente") {
//             return res.redirect("/admin_cliente");
//         } else {
//             return res.status(400).json({ message: "Acesso não autorizado" });
//         }
        
//         }catch(error){
//         return res.status(500).json({message:"Erro ao fazer login"})  
//     }
 
//  }
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log("Dados de login recebidos:", email);

        // Verificar se o usuário existe
        const user = await findUserByEmail(email);
        if (!user) {
            console.log("Usuário não encontrado.");
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Verificar se a senha é válida
        const isPasswordValid = await verifyPassword(senha, user.senha);
        if (!isPasswordValid) {
            console.log("Senha incorreta.");
            return res.status(401).json({ message: "Senha incorreta" });
        }

        // Verificar sessão do usuário
        req.session.userId = user.id;
        req.session.role = user.nivel_acesso;

        // Redireciona conforme o nível de acesso
        if (user.nivel_acesso === "admin_master") {
            return res.redirect("/auth/admin_master");
        } else if (user.nivel_acesso === "admin_funcionario") {
            return res.redirect("/auth/admin_funcionario");
        } else if (user.nivel_acesso === "admin_cliente") {
            return res.redirect("/auth/admin_cliente");
        } else {
            console.log("Acesso não autorizado");
            return res.status(400).json({ message: "Acesso não autorizado" });
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        return res.status(500).json({ message: "Erro ao fazer login" });
    }
};




 //função para fazer logout
 const logout = (req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({message:"Erro ao deslogar"})
        }
        return res.redirect("/login")
    })
    
 }

 export {login,logout}  