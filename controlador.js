const {client} = require('./db')
const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken')

const listUsers = async(req,res) => {
    res.send('Lista de usuarios!')
}

const createUsers = async(req,res) => {
    try{
        const {nome, email, senha} = req.body;
        const senhacriptografada = await bcryptjs.hashSync(senha, 10)
        const sql = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`
        const dados = await client.query(sql, [nome, email, senhacriptografada])
        res.status(201).json({msg: 'O user foi criado com sucesso!'})
    }catch(err){
        res.status(500).json({msg: 'Erro ao criar seu user!'})
    }
}

const updateUsers = async(req,res) => {
    try{
        const id = req.params.id;
        const {nome, email} = req.body;
        const sql = `UPDATE usuarios SET nome  = $1, email = $2 WHERE id = $3 RETURNING *`
        const dados = await client.query(sql, [nome, email, id])
        console.log(dados)
        res.status(201).json({msg: 'O user foi atualizado com sucesso!'})
    }catch(err){
        res.status(500).json({msg: 'Erro ao atualizar seu user!'})
    }
}

const deleteUsers = async(req,res) => {
    try{
    const id = req.params.id;
        const sql = `DELETE FROM usuarios WHERE id = $1`
        const dados = await client.query(sql, [id])
        res.status(200).json({msg: 'O user foi deletado com sucesso!'})
}catch(err){
    res.status(500).json({msg: 'Erro ao deletar seu user!'})
}
}

const getUsers = async(req,res) => {
    console.log('teste')
    res.send('Pegou um usuario!')
}

const login = async (req, res) => {
    try{
        const {email, senha} = req.body;
        const sql = `SELECT * FROM usuarios WHERE email = $1`
        const usuario = await client.query(sql, [email])
        const validPassword = bcryptjs.compareSync(senha, usuario.rows[0].senha)
        console.log(validPassword) 
        const token = jwt.sign(
            {
                _id: usuario.rows[0].id,
                email: usuario.rows[0].email,
                nome: usuario.rows[0].nome,
            },
            process.env.jwt_secret_key,
            {expiresIn: 1000*60*60*24*3}
        )

        res.status(200).cookie("Rogerio", token,{} ).json({msg: "Loguin efetuado!"})
    }catch(err){
        console.log(err)
        res.status(500)
    }
}
    

module.exports = { 
    listUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    getUsers,
    login
};

