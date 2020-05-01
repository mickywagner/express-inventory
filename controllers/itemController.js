var Item = require('../models/item')

exports.item_list = function(req, res, next) {
    Item.find()
        .populate('item')
        .exec(function(err, list_items) {
            if(err) {return next(err)}
            res.render('item_list', {title: 'Item List', items: list_items})
        })
}

exports.item_detail = function(req, res) {
    res.send('FUTURE ITEM DETAILS')
}

exports.item_create_get = function(req, res) {
    res.send('FUTURE CREATE ITEM GET')
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