const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productReviewsSchema = mongoose.Schema(
  // add manufacturer
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
      enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    },
    description: {
      type: String,
      default: '',
    },
    isPurchaseVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
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
    quantityAvailable: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default() {
        const rating = this.productReviews
          ? this.productReviews.reduce((acc, review) => acc + review.score, 0) / this.reviews.length
          : 0;
        return Math.round(rating * 2) / 2;
      },
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    reviews: {
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
