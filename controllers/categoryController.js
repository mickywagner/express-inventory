var Category = require('../models/category')
var Item = require('../models/item')
var itemCopy = require('../models/itemcopy')

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

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
        },
        itemcopy_count_available: function(callback) {
            itemCopy.countDocuments({status: 'Available'}, callback)
        },
        itemcopy_count_onorder: function(callback) {
            itemCopy.countDocuments({status: 'On Order'}, callback)
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

exports.category_detail = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id)
                .exec(callback)
        },
        items: function(callback) {
            Item.find({'category': req.params.id})
                .exec(callback)
        }
    }, function(err, results) {
        if(err) { return next(err)}
        if(results.category==null) {
            var err = new Error('Category not found')
            err.status = 404
            return next(err)
        }
        res.render('category_detail', {title: 'Category Details', category: results.category, items: results.items})
    })
            
}

exports.category_create_get = function(req, res, next) {
    res.render('category_form', {title: 'Create New Equipment Category'})
}

exports.category_create_post = [
    body('name', 'Category name is required').trim().isLength({min: 1}),
    body('description', 'Category description is required').trim().isLength({min: 1}),

    sanitizeBody('name').escape(),
    sanitizeBody('description').escape(),

    (req, res, next) => {
        const errors = validationResult(req)

        var category = new Category(
            {
                name: req.body.name,
                description: req.body.description
            }
        )

        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Create New Equipment Category', category: category, errors: errors.array()})
        } else {
            Category.findOne({'name': req.body.name})
                .exec(function(err, found_category) {
                    if(err) { return next(err)}

                    if(found_category) {
                        res.redirect(found_category.url)
                    } else {
                        category.save(function(err) {
                            if(err) { return next(err)}
                            res.redirect(category.url)
                        })
                    }
                })
        }
    }  
]

exports.category_update_get = function(req, res, next) {
    Category.findById(req.params.id)
        .exec(function(err, category) {
            if(err) { return next(err)}
            res.render('category_form', {title: 'Update Category', category: category})
        })
    
}

exports.category_update_post = [
    body('name').trim().isLength({min: 1}),
    body('description').trim().isLength({min: 1}),

    sanitizeBody('*').escape(),

    (req, res, next) => {
        var errors = validationResult(req)

        var category = new Category({
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id
        })

        if(!errors.isEmpty()) {
            res.render('category_form', {title: 'Update Category', category: category, errors: errors.array()})
        } else {
            Category.findByIdAndUpdate(req.params.id, category, {}, function(err, thecategory) {
                if(err) { return next(err)}
                res.redirect(`/store/category/${req.params.id}`)
            })
        }
    }
]

exports.category_delete_get = function(req, res) {
    res.send('DELETE CATEGORY GET')
}

exports.category_delete_post = function(req, res) {
    res.send('DELETE CATEGORY POST')
}