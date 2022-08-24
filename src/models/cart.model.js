const mongoose = require('mongoose');
const Product = require('./product.model');
const Package = require('./package.model');
const { toJSON, paginate } = require('./plugins');

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // array of products
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Product,
      default: [],
    },
    // array of packages
    packages: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Package,
      default: [],
    },
    totalCart: {
      type: Number,
      default() {
        try {
          const total =
            this.products.reduce((product) => product.price, 0) + this.packages.reduce((onePackage) => onePackage.price, 0);
          if (total) {
            return total;
          }
        } catch (err) {
          return 0;
        }
      }, // package is reserved keyword
    },
  },
  { timestamps: true }
);

CartSchema.plugin(toJSON);
CartSchema.plugin(paginate);

module.exports = mongoose.model('Cart', CartSchema);
