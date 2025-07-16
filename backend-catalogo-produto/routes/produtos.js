const express = require('express');
const router = express.Router();
const ProdutoModel = require('../models/produtoModel');

router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        console.log(`\n(ROTA COM MODEL) Buscando no MongoDB pelo productId: ${productId}`);
        console.time('Tempo de busca no MongoDB (com Model)');

        const produto = await ProdutoModel.findByProductId(productId);

        console.timeEnd('Tempo de busca no MongoDB (com Model)');

        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: 'Produto não encontrado no banco de dados' });
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// // --- LÓGICA TEMPORÁRIA DE DADOS EM MEMÓRIA ---
// const produtosArray = [];
// for (let i = 0; i < 50000; i++) {
//     produtosArray.push({ id: `produto-${i}`, nome: `Produto Exemplo ${i}` });
// }
// const produtosMapa = {};
// produtosArray.forEach(p => { produtosMapa[p.id] = p; });
// // --- FIM DA LÓGICA TEMPORÁRIA ---

// // ROTA LENTA - Note que trocamos 'app.get' por 'router.get'
// router.get('/produtos-array/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(`\n(ROTA ANTIGA) Buscando (com ARRAY) pelo ID: ${id}`);
//     console.time('Tempo de busca no Array');
//     const produtoEncontrado = produtosArray.find(p => p.id === id);
//     console.timeEnd('Tempo de busca no Array');
//     if (produtoEncontrado) res.json(produtoEncontrado);
//     else res.status(404).json({ message: 'Produto não encontrado' });
// });

// // ROTA RÁPIDA - Também usando 'router.get'
// router.get('/produtos-mapa/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(`\n(ROTA ANTIGA) Buscando (com MAPA) pelo ID: ${id}`);
//     console.time('Tempo de busca no Mapa');
//     const produtoEncontrado = produtosMapa[id];
//     console.timeEnd('Tempo de busca no Mapa');
//     if (produtoEncontrado) res.json(produtoEncontrado);
//     else res.status(404).json({ message: 'Produto não encontrado' });
// });


// // No final, exportamos o roteador para que o server.js possa usá-lo

module.exports = router;