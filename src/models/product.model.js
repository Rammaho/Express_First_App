const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productReviewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
    howToUse: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sourcePinCode: {
      type: String,
    },
    sourceAddress: {
      type: String,
    },
    deliverablePinCodes: {
      type: Array,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    productReviews: {
      type: [productReviewsSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
