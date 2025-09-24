const { Category, Product } = require("../models/associations");
const { Op } = require("sequelize");

// GET /categories - Listar todas as categorias
const getCategories = async (req, res) => {
  try {
    const { search, active } = req.query;

    let whereClause = {};

    if (search) {
      whereClause.name = {
        [Op.like]: `%${search}%`,
      };
    }

    if (active !== undefined) {
      whereClause.is_active = active === "true";
    }

    const categories = await Category.findAll({
      where: whereClause,
      include: [
        {
          model: Product,
          attributes: ["id"],
          where: { is_active: true },
          required: false,
        },
      ],
      order: [["name", "ASC"]],
    });

    // Adicionar contagem de produtos para cada categoria
    const categoriesWithCount = categories.map((category) => ({
      ...category.toJSON(),
      productCount: category.Products ? category.Products.length : 0,
    }));

    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /categories/:id - Buscar categoria por ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          where: { is_active: true },
          required: false,
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /categories - Criar nova categoria
const createCategory = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    // Verificar se já existe categoria com o mesmo nome
    const existingCategory = await Category.findOne({
      where: { name: { [Op.iLike]: name } },
    });

    if (existingCategory) {
      return res.status(400).json({
        error: "Já existe uma categoria com este nome",
      });
    }

    const category = await Category.create({
      name,
      description,
      color,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /categories/:id - Atualizar categoria
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    // Verificar se o novo nome já existe (se foi alterado)
    if (req.body.name && req.body.name !== category.name) {
      const existingCategory = await Category.findOne({
        where: {
          name: { [Op.iLike]: req.body.name },
          id: { [Op.ne]: req.params.id },
        },
      });

      if (existingCategory) {
        return res.status(400).json({
          error: "Já existe uma categoria com este nome",
        });
      }
    }

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /categories/:id - Desativar categoria
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    // Verificar se há produtos associados
    const productCount = await Product.count({
      where: {
        category: category.name,
        is_active: true,
      },
    });

    if (productCount > 0) {
      return res.status(400).json({
        error: `Não é possível excluir categoria com ${productCount} produtos associados`,
      });
    }

    await category.update({ is_active: false });
    res.json({ message: "Categoria desativada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /categories/:id/products - Produtos de uma categoria
const getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { search, lowStock } = req.query;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    let whereClause = {
      category: category.name,
      is_active: true,
    };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } },
      ];
    }

    if (lowStock === "true") {
      whereClause.stock = {
        [Op.lte]: 5,
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

// GET /categories/stats - Estatísticas das categorias
const getCategoryStats = async (req, res) => {
  try {
    const stats = await Category.findAll({
      attributes: [
        "id",
        "name",
        [
          Category.sequelize.fn("COUNT", Category.sequelize.col("Products.id")),
          "productCount",
        ],
        [
          Category.sequelize.fn(
            "SUM",
            Category.sequelize.col("Products.stock")
          ),
          "totalStock",
        ],
        [
          Category.sequelize.fn(
            "AVG",
            Category.sequelize.col("Products.price")
          ),
          "avgPrice",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: [],
          where: { is_active: true },
          required: false,
        },
      ],
      group: ["Category.id", "Category.name"],
      order: [
        [
          Category.sequelize.fn("COUNT", Category.sequelize.col("Products.id")),
          "DESC",
        ],
      ],
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
  getCategoryStats,
};
