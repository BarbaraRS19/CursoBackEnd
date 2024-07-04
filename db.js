const {Client} = require('pg')

const client = new Client({
    host: process.env.host,
    port: process.env.post,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

const connectDB = async () => {
    client.connect()
    .then(() => {
        console.log('A conexão funcionou!')
    }).catch((err) => {
        console.error('Erro ao conectar!')
    });
};
module.exports = connectDB