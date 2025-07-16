// backend-catalogo-produto/models/produtoModel.js

const { getDB } = require('../database');
const COLLECTION_NAME = 'produtos';

const ProdutoModel = {

    async findByProductId(productId) {
        const collection = getDB().collection(COLLECTION_NAME);
        return await collection.findOne({ productId: productId });
    },

    // --- NOVA FUNÇÃO ---
    /**
     * Conta o total de documentos na coleção de produtos.
     * @returns {Promise<number>} O número de documentos.
     */
    async count() {
        const collection = getDB().collection(COLLECTION_NAME);
        return await collection.countDocuments();
    },

    // --- NOVA FUNÇÃO ---
    /**
     * Insere um array de documentos de produtos no banco.
     * @param {Array<object>} arrayDeProdutos - O array de produtos a ser inserido.
     * @returns {Promise<object>} O resultado da operação insertMany.
     */
    async createMany(arrayDeProdutos) {
        const collection = getDB().collection(COLLECTION_NAME);
        return await collection.insertMany(arrayDeProdutos);
    },

    async ensureIndexes() {
        try {
            console.log('ℹ️ Garantindo a existência dos índices...');
            const collection = getDB().collection(COLLECTION_NAME);

            // Cria um índice no campo 'productId' se ele não existir.
            // { unique: true } garante que não haverá dois produtos com o mesmo productId.
            await collection.createIndex({ productId: 1 }, { unique: true });

            console.log('✅ Índice para `productId` garantido.');

        } catch (err) {
            console.error('❌ Erro ao criar índices.', err);
        }
    }


};

module.exports = ProdutoModel;