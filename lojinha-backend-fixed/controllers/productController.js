const { Product } = require("../models/associations");
const { Op } = require("sequelize");

// GET /products - Listar todos os produtos
const getProducts = async (req, res) => {
  try {
    const { search, category, lowStock } = req.query;

    let whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      whereClause.category = category;
    }

    if (lowStock === "true") {
      whereClause.stock = {
        [Op.lte]: Product.sequelize.col("minStock"),
      };
    }

    const products = await Product.findAll({
      where: whereClause,
      order: [["name", "ASC"]],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /products/:id - Buscar produto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /products - Criar novo produto
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /products/:id - Atualizar produto
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /products/:id - Desativar produto (soft delete)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    await product.update({ isActive: false });
    res.json({ message: "Produto desativado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /products/:id/stock - Atualizar estoque
const updateStock = async (req, res) => {
  try {
    const { quantity, operation = "add" } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    let newStock = product.stock;
    if (operation === "add") {
      newStock += quantity;
    } else if (operation === "subtract") {
      newStock -= quantity;
    } else if (operation === "set") {
      newStock = quantity;
    }

    if (newStock < 0) {
      return res.status(400).json({ error: "Estoque não pode ser negativo" });
    }

    await product.update({ stock: newStock });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /products/categories - Listar categorias
const getCategories = async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: ["category"],
      where: {
        category: { [Op.ne]: null },
        isActive: true,
      },
      group: ["category"],
      order: [["category", "ASC"]],
    });

    res.json(categories.map((c) => c.category));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /products/low-stock - Produtos com estoque baixo
const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        isActive: true,
        stock: {
          [Op.lte]: Product.sequelize.col("minStock"),
        },
      },
      order: [["stock", "ASC"]],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getCategories,
  getLowStockProducts,
};
