var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ItemSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
        rarity: {type: String, required: true, enum: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'], default: 'Common'},
        damage: { type: String},    
    }
)


ItemSchema
    .virtual('url')
    .get(function() {
        return ('/item/' + this._id)
    })

module.exports = mongoose.model('Item', ItemSchema)