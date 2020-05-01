var itemCopy = require('../models/itemcopy')

exports.itemCopy_list = function(req, res, next) {
    itemCopy.find()
        .populate('item')
        .exec(function(err, item_copies) {
            if(err) {return next(err)}
            res.render('itemcopy_list', {title: 'Item Inventory List', item_copies: item_copies})
        })
}

exports.itemCopy_detail = function(req, res) {
    res.send('ITEM COPY DETAILS')
}

exports.itemCopy_create_get = function(req, res) {
    res.send('FUTURE ITEM COPY CREATE GET')
}

exports.itemCopy_create_post = function(req, res) {
    res.send('FUTURE ITEM COPY CREATE POST')
}

exports.itemCopy_update_get = function(req, res) {
    res.send('FUTURE ITEM COPY UPDATE GET')
}

exports.itemCopy_update_post = function(req, res) {
    res.send('FUTURE ITEM COPY UPDATE POST')
}

exports.itemCopy_delete_get = function(req, res) {
    res.send('FUTURE ITEM COPY DELETE GET')
}

exports.itemCopy_delete_post = function(req, res) {
    res.send('FUTURE ITEM COPY DELETE POST')
}   