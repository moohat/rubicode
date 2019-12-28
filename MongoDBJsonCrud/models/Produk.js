var mongoose = require('mongoose');

var ProdukSchema = new mongoose.Schema({
    nama: String,
    kategori: String,
    biaya : Number
});

module.exports = mongoose.model('Produk', ProdukSchema);