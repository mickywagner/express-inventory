var Item = require('../models/item')
var ItemCopy = require('../models/itemcopy')
var Category = require('../models/category')

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

exports.item_create_post = function(req, res) {
    res.send('FUTURE CREATE ITEM POST')
}

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