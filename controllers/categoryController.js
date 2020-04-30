var Category = require('../models/category')
var Item = require('../models/item')
var itemCopy = require('../models/itemcopy')

var async = require('async')

exports.index = function(req, res, next) {

    async.parallel({
        category_count: function(callback) {
            Category.countDocuments({}, callback)
        },
        item_count: function(callback) {
            Item.countDocuments({}, callback)
        },
        itemcopy_count: function(callback) {
            itemCopy.countDocuments({}, callback)
        }
    }, function(err, results) {
        res.render('index', { title: 'The Wandering Turtle Equipment Emporium', errors: err, data: results})
    })
   
}

exports.category_list = function(req, res, next) {
    Category.find()
        .populate('category')
        .exec(function(err, list_category) {
            if(err) {return next(err)}
            res.render('category_list', {title: 'Equipment Category List', category_list: list_category})
        }) 
}

exports.category_detail = function(req, res) {
    res.send('FUTURE CATEGORY DETAIL PAGE')
}

exports.category_create_get = function(req, res) {
    res.send('CREATE CATEGORY GET')
}

exports.category_create_post = function(req, res) {
    res.send('CREATE CATEGORY POST')
}

exports.category_update_get = function(req, res) {
    res.send('UPDATE CATEGORY GET')
}

exports.category_update_post = function(req, res) {
    res.send('UPDATE CATEGORY POST')
}

exports.category_delete_get = function(req, res) {
    res.send('DELETE CATEGORY GET')
}

exports.category_delete_post = function(req, res) {
    res.send('DELETE CATEGORY POST')
}