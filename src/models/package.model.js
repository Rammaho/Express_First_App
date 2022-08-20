const mongoose = require ('mongoose');
const { toJSON, paginate } = require ('./plugins');


const packageSchema = mongoose.Schema(
    {
        name: {
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
        sourcePinCodes: {
            type: String,
        },
        sourceAddress: {
            type: String,
        },
        deliverablePinCodes :{
            type: Array,
            },
        quantityAvailable: {
            type: Number,
            required: true,
        },
        category :{
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isPromoted: {
            type: Boolean,
            default: false,
        },

},
{
    timestamps : true,
}
);


packageSchema.plugin(toJSON);
packageSchema.plugin(paginate);

const Package = mongoose.model('package', packageSchema);

module.exports = Package;