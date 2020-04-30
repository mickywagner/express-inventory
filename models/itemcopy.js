var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ItemCopySchema = new Schema(
    {
        item: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
        price: { type: Number},
        weight: { type: Number},
        status: { type: String, required: true, enum: ['Available', 'Out of Stock', 'On Order'], default: 'On Order'}
    }
)

ItemCopySchema
    .virtual('url')
    .get(function() {
        return '/store/itemcopy/' + this._id
    })

module.exports = mongoose.model('ItemCopy', ItemCopySchema)