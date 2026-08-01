const express = require("express");
const products = require("./products");
const errorHandler = require("./errorHandler");

const app = express();

app.use(express.json());

//Get all Products with filtering
app.get("/products", (req, res, next) => {
  try {
    let filteredProducts = [...products];

    const { search, category, brand, sort, page = 1, limit = 5 } = req.query;

    // -----------------------------
    // Search
    // -----------------------------
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // -----------------------------
    // Category Filter
    // -----------------------------
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // -----------------------------
    // Brand Filter
    // -----------------------------
    if (brand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.toLowerCase() === brand.toLowerCase(),
      );
    }

    // -----------------------------
    // Sorting
    // -----------------------------
    if (sort) {
      switch (sort) {
        case "price":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;

        case "-price":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;

        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;

        case "name":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case "-name":
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;

        default:
          const error = new Error("Invalid Sort Field");
          error.statusCode = 400;
          return next(error);
      }
    }

    // -----------------------------
    // Pagination
    // -----------------------------
    const currentPage = Number(page);
    const pageLimit = Number(limit);

    if (currentPage < 1 || pageLimit < 1) {
      const error = new Error("Page and Limit must be greater than 0");
      error.statusCode = 400;
      return next(error);
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / pageLimit);

    const startIndex = (currentPage - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;

    filteredProducts = filteredProducts.slice(startIndex, endIndex);

    // -----------------------------
    // Response
    // -----------------------------
    res.status(200).json({
      success: true,
      page: currentPage,
      limit: pageLimit,
      totalProducts,
      totalPages,
      count: filteredProducts.length,
      message: "Products fetched successfully",
      data: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
});

//Get Product by ID;
app.get("/products/:id", (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    //Validate ID
    if (isNaN(productId)) {
      const error = new Error("Invalid Product ID");
      error.statusCode = 400;
      return next(error);
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      const error = new Error("Product Not Found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

//Create a New Product

app.post("/products", (req, res, next) => {
  try {
    const { name, category, brand, price, stock, rating } = req.body;

    //Validate fields
    if (
      !name ||
      !category ||
      !brand ||
      price === undefined ||
      stock === undefined ||
      rating === undefined
    ) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    //name validation
    if (name.trim().length < 3) {
      const error = new Error("Product name must contain atlease 3 characters");
      error.statusCode = 400;
      return next(error);
    }

    //Price Validation
    if (price <= 0) {
      const error = new Error("Price must be greater than 0");
      error.statusCode = 400;
      return next(error);
    }

    //stock validation
    if (stock < 0) {
      const error = new Error("Stock cannot be negative");
      error.statusCode = 400;
      return next(error);
    }

    //Rating validation
    if (rating < 1 || rating > 5) {
      const error = new Error("Rating must be between 1 and 5");
      error.statusCode = 400;
      return next(error);
    }

    const existingProduct = products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );

    if (existingProduct) {
      const error = new Error("Product already exists");
      error.statusCode = 409; // Conflict
      return next(error);
    }

    //Generate a new ID
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name,
      category,
      brand,
      price,
      stock,
      rating,
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created Successfully",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

//Update a Product

app.put("/products/:id", (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      const error = new Error("Invalid Product ID");
      error.statusCode = 400;
      return next(error);
    }

    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      const error = new Error("Product Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const { name, category, brand, price, stock, rating } = req.body;

    if (
      !name ||
      !category ||
      !brand ||
      price === undefined ||
      stock === undefined ||
      rating === undefined
    ) {
      const error = new Error("All fields are required for PUT");
      error.statusCode = 400;
      return next(error);
    }

    products[index] = {
      id: productId,
      name,
      category,
      brand,
      price,
      stock,
      rating,
    };

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: products[index],
    });
  } catch (error) {
    next(error);
  }
});

//Partial update a Product

app.patch("/products/:id", (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      const error = new Error("Invalid Product ID");
      error.statusCode = 400;
      return next(error);
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      const error = new Error("Product Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const { name, category, brand, price, stock, rating } = req.body;

    if (name !== undefined) product.name = name;

    if (category !== undefined) product.category = category;

    if (brand !== undefined) product.brand = brand;

    if (price !== undefined) {
      if (price <= 0) {
        const error = new Error("Price must be greater than 0");
        error.statusCode = 400;
        return next(error);
      }

      product.price = price;
    }

    if (stock !== undefined) {
      if (stock < 0) {
        const error = new Error("Stock cannot be negative");
        error.statusCode = 400;
        return next(error);
      }

      product.stock = stock;
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        const error = new Error("Rating must be between 1 and 5");
        error.statusCode = 400;
        return next(error);
      }

      product.rating = rating;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

//Delet a Product

app.delete("/products/:id", (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    // Validate Product ID
    if (isNaN(productId)) {
      const error = new Error("Invalid Product ID");
      error.statusCode = 400;
      return next(error);
    }

    const productIndex = products.find((p) => p.id === productId);

    if (productIndex === -1) {
      const error = new Error("Product Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
      data: deletedProduct[0],
    });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
