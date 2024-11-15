import bcrypt from 'bcrypt'
import pool from '../config/db.js'


// fnção çpara buscar o usuario pelo email

// src/models/usermodel.js
const findUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        // Retorna null se o usuário não for encontrado
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        throw new Error("Erro ao buscar usuário");
    }
};


    // função para criar usuario
// Função para criar usuário
const createUser = async (nome, email, senha, nivel_acesso) => {
    try {
        // Criptografando a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        // Inserindo usuário no banco de dados
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, senha, nivel_acesso) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, senhaCriptografada, nivel_acesso]
        );

        // Retorna o usuário criado
        return result.rows[0];
    } catch (error) {
        throw new Error("Erro ao criar usuário no banco de dados");
    }
};




//função para verificar se a senha informada corresponde a senha criptografaDA

const verifyPassword =  async (senhaInformada, senhaCriptografada)=>{
    try{

        return  await bcrypt.compare(senhaInformada, senhaCriptografada)

    }catch(error){
        throw new Error("Erro ao verificar senha")
    }
}


export {findUserByEmail, createUser, verifyPassword}











