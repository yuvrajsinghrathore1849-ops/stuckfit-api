import express from 'express';
// import Product from '../models/Product.js';
import products from '../data/localProducts.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|glb|gltf|obj/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type! Valid formats: Images, .glb, .gltf, .obj'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading products' });
  }
});

// @desc    Fetch single product by its custom 'id'
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
       res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading product' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'model3d', maxCount: 1 }]), (req, res) => {
  try {
    const { name, price, category, description, brand, isNew, isTrending } = req.body;
    let imageUrl = req.body.images || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800';
    let model3dUrl = '';
    
    // If files were uploaded
    if (req.files) {
      if (req.files['image']) {
        imageUrl = `http://localhost:5000/uploads/${req.files['image'][0].filename}`;
      }
      if (req.files['model3d']) {
        model3dUrl = `http://localhost:5000/uploads/${req.files['model3d'][0].filename}`;
      }
    }
    
    const newProduct = {
      id: 'p' + (products.length + 1), // Simple ID generation
      name: name || 'Sample Product',
      price: Number(price) || 0,
      category: category || 'accessories',
      description: description || 'No description',
      images: [imageUrl],
      model3d: model3dUrl,
      sizes: ['S', 'M', 'L'], // Default sizes
      colors: ['Black'], // Default colors
      brand: brand || 'Stuckfit',
      rating: 0,
      reviews: 0,
      isNew: isNew === 'true' || isNew === true,
      isTrending: isTrending === 'true' || isTrending === true,
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error adding product' });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'model3d', maxCount: 1 }]), (req, res) => {
  try {
    const { name, price, category, description, brand, isNew, isTrending } = req.body;
    
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex !== -1) {
      let imageUrl = req.body.images || products[productIndex].images[0];
      let model3dUrl = products[productIndex].model3d || '';
      
      if (req.files) {
        if (req.files['image']) {
          imageUrl = `http://localhost:5000/uploads/${req.files['image'][0].filename}`;
        }
        if (req.files['model3d']) {
          model3dUrl = `http://localhost:5000/uploads/${req.files['model3d'][0].filename}`;
        }
      }

      const updatedProduct = {
        ...products[productIndex],
        name: name || products[productIndex].name,
        price: price ? Number(price) : products[productIndex].price,
        category: category || products[productIndex].category,
        description: description || products[productIndex].description,
        images: [imageUrl],
        model3d: model3dUrl,
        brand: brand || products[productIndex].brand,
        isNew: isNew !== undefined ? (isNew === 'true' || isNew === true) : products[productIndex].isNew,
        isTrending: isTrending !== undefined ? (isTrending === 'true' || isTrending === true) : products[productIndex].isTrending,
      };
      
      products[productIndex] = updatedProduct;
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating product' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', (req, res) => {
  try {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting product' });
  }
});

export default router;
