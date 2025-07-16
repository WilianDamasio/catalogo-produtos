// backend-catalogo-produto/server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Rotas
const ProdutoModel = require('./models/produtoModel');
const produtosRouter = require('./routes/produtos');

app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtosRouter);



async function startServer() {

    await connectToDatabase();
    await seedDatabase();
    await ProdutoModel.ensureIndexes();

    app.listen(PORT, () => {
        console.log(`\n--- Servidor Backend rodando na porta ${PORT} ---`);
    });

}


async function seedDatabase() {
    try {

        const count = await ProdutoModel.count();

        if (count > 0) {
            console.log('ℹ️ O banco de dados já está populado. Seeding não é necessário.');
            return;
        }

        console.log('ℹ️ Banco de dados vazio. Iniciando o seeding de 50.000 produtos...');
        const produtos = [];
        for (let i = 0; i < 50000; i++) {
            produtos.push({
                productId: `produto-${i}`,
                nome: `Produto Exemplo ${i}`,
                preco: parseFloat((Math.random() * 100).toFixed(2)),
                categoria: `Categoria ${i % 10}`
            });
        }

        await ProdutoModel.createMany(produtos);
        console.log('✅ Seeding concluído com sucesso via Model!');

    } catch (error) {
        console.error('❌ Erro durante o seeding do banco de dados.', error);
    }

}

startServer()