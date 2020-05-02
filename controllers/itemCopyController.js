var itemCopy = require('../models/itemcopy')
var Item = require('../models/item')

exports.itemCopy_list = function(req, res, next) {
    itemCopy.find()
        .populate('item')
        .exec(function(err, item_copies) {
            if(err) {return next(err)}
            res.render('itemcopy_list', {title: 'Item Inventory List', item_copies: item_copies})
        })
}

exports.itemCopy_detail = function(req, res, next) {
    itemCopy.findById(req.params.id)
        .populate('item')
        .exec(function(err, item){
            if(err) {return next(err)}
            if(item==null) {
                var error = new Error('This item does not exist')
                error.status = 404
                return next(error)
            }
            res.render('itemcopy_detail', {title: 'Item Copy Details', itemcopy: item})
        })
}

exports.itemCopy_create_get = function(req, res, next) {
    Item.find()
        .exec(function(err, items) {
            if(err) {return next(err)}
            res.render('itemcopy_form', {title: 'Create New Item Copy', items: items})
        })
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