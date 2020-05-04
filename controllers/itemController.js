var Item = require('../models/item')
var ItemCopy = require('../models/itemcopy')
var Category = require('../models/category')

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var async = require('async')

exports.item_list = function(req, res, next) {
    Item.find()
        .populate('item')
        .exec(function(err, list_items) {
            if(err) {return next(err)}
            res.render('item_list', {title: 'Item List', items: list_items})
        })
}

exports.item_detail = function(req, res, next) { 
    async.parallel({
        item: function(callback) {
            Item.findById(req.params.id)
                .populate('category')
                .exec(callback)
        },
        item_copies: function(callback) {
            ItemCopy.find({'item': req.params.id})
                .exec(callback)
        }
    }, function(err, results) {
        if(err) {return next(err)}
        if(results.item==null) {
            var error = new Error('Item not found!')
            error.status = 404
            return next(error)
        }
        res.render('item_detail', {title: 'Item Details', item: results.item, item_copies: results.item_copies})
    })
}

exports.item_create_get = function(req, res, next) {
    Category.find()
        .exec(function(err, category) {
            if(err) { return next(err)}
            res.render('item_form', {title: 'Create New Item Listing', categories: category})
        })
}

exports.item_create_post = [
    body('name', 'Item name is required').trim().isLength({min: 1}),
    body('category', 'Category is required').trim().isLength({min: 1}),
    body('rarity', 'Rarity is required').trim().isLength({min: 1}),
    body('description', 'Item description is required').trim().isLength({min: 1}),
    body('damage').optional({ checkFalsy: true}).isLength({min: 3}),

    sanitizeBody('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req)

        var item = new Item(
            {
                name: req.body.name,
                category: req.body.category,
                rarity: req.body.rarity,
                description: req.body.description,
                damage: req.body.damage
            }
        )

        if(!errors.isEmpty()) {
            Category.find()
                .exec(function(err, category) {
                    if(err) { return next(err)}
                    res.render('item_form', { title: 'Create New Item Listing', categories: category, item: item, errors: errors.array()})
                })
        } else {
            Item.findOne({'name': req.body.name})
                .exec(function(err, found_item){
                    if(err) { return next(err)}
                    if(found_item) {
                        res.redirect(found_item.url)
                    } else {
                        item.save(function(err) {
                            if(err) { return next(err)}
                            res.redirect(item.url)
                        })
                    }
                 })
        }
    }

]
exports.item_update_get = function(req, res) {
    res.send('FUTURE UPDATE ITEM GET')
}

exports.item_update_post = function(req, res) {
    res.send('FUTURE UPDATE ITEM POST')
}

exports.item_delete_get = function(req, res) {
    res.send('FUTURE DELETE ITEM GET')
}

exports.item_delete_post = function(req, res) {
    res.send('FUTURE DELETE ITEM POST')
}