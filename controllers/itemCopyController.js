var itemCopy = require('../models/itemcopy')
var Item = require('../models/item')

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var async = require('async')

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
            res.render('itemcopy_form', {title: 'Create New Item Copy', items: items, selected_item: ''})
        })
}

exports.itemCopy_create_post = [
    body('item', 'Item is required').trim().isLength({min: 1}),
    body('price').optional({checkFalsy: true}),
    body('weight').optional({checkFalsy:true}),
    body('status', 'Status is required').trim().isLength({min: 3}),

    sanitizeBody('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req)

        var itemcopy = new itemCopy(
            {
                item: req.body.item,
                price: req.body.price,
                weight: req.body.weight,
                status: req.body.status
            }
        )

        if(!errors.isEmpty()) {
            Item.find()
                .exec(function(err, items) {
                    if(err) { return next(err)}
                    res.render('itemcopy_form', { title: 'Create New Item Copy', items: items, errors: errors.array()})
                })
        } else {
            itemcopy.save(function(err) {
                if(err) { return next(err)}
                res.redirect(itemcopy.url)
            })
        }
    }
]

exports.itemCopy_update_get = function(req, res, next) {
    async.parallel({
        itemcopy: function(callback) {
            itemCopy.findById(req.params.id).populate('item').exec(callback)
        },
        item: function(callback) {
            Item.find().exec(callback)
        }
    }, function(err, results) {
        if(err) { return next(err)}
        res.render('itemcopy_form', { title: 'Update Item Copy', itemcopy: results.itemcopy, items: results.item, selected_item: results.itemcopy.item._id})
    })
}

exports.itemCopy_update_post = [
    body('item').trim().isLength({min: 1}),
    body('price').trim().optional({checkFalsy: true}).isLength({min: 3}),
    body('weight').trim().optional({checkFalsy: true}).isLength({min: 1}),
    body('status').trim().isLength({min: 1}),

    sanitizeBody('*').escape(),

    (req, res, next) => {
        var errors = validationResult(req)

        var itemcopy = new itemCopy(
            {
                item: req.body.item,
                price: (req.body.price ? req.body.price : ''),
                weight: (req.body.weight ? req.body.weight : ''),
                status: req.body.status,
                _id: req.params.id
            }
        )

        if(!errors.isEmpty()) {
            Item.find()
                .exec(function(err, items) {
                    if(err) { return next(err)}
                    res.render('itemcopy_form', {title: 'Update Item Copy', items: items, itemcopy: itemcopy, selected_item: itemcopy.item._id, errors: errors.array()})
                })
        } else {
            itemCopy.findByIdAndUpdate(req.params.id, itemcopy, {}, function(err, theitemcopy) {
                if(err) {return next(err)}
                res.redirect(`/store/itemcopy/${req.params.id}`)
            })
        }
        
    }
]

exports.itemCopy_delete_get = function(req, res, next) {
    itemCopy.findById(req.params.id).populate('item').exec(function(err, itemcopy) {
        if(err) { return next(err)}
        res.render('itemcopy_delete', {title: 'Delete Item Copy', itemcopy: itemcopy})
    })
    
}

exports.itemCopy_delete_post = function(req, res) {
    res.send('FUTURE ITEM COPY DELETE POST')
}   