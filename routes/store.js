var express = require('express')
var router = express.Router()

var multer = require('multer')
var path = require('path')


const storageEngine = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, fn) {
        fn(null, new Date().getTime().toString() + '-'+file.fieldname+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 }
}).single('picture')

var category_controller = require('../controllers/categoryController')
var item_controller = require('../controllers/itemController')
var itemCopy_controller = require('../controllers/itemCopyController')

// CATEGORIES
router.get('/', category_controller.index)

router.get('/category/create', category_controller.category_create_get)
router.post('/category/create', upload, category_controller.category_create_post)

router.get('/category/:id/delete', category_controller.category_delete_get)
router.post('/category/:id/delete', category_controller.category_delete_post)

router.get('/category/:id/update', category_controller.category_update_get)
router.post('/category/:id/update', upload, category_controller.category_update_post)

router.get('/category/:id', category_controller.category_detail)

router.get('/categories', category_controller.category_list)

// ITEMS

router.get('/item/create', item_controller.item_create_get)
router.post('/item/create', upload, item_controller.item_create_post)

router.get('/item/:id/delete', item_controller.item_delete_get)
router.post('/item/:id/delete', item_controller.item_delete_post)

router.get('/item/:id/update', item_controller.item_update_get)
router.post('/item/:id/update', upload, item_controller.item_update_post)

router.get('/item/:id', item_controller.item_detail)

router.get('/items', item_controller.item_list)

// ITEM COPIES

router.get('/itemcopy/create', itemCopy_controller.itemCopy_create_get)
router.post('/itemcopy/create', upload, itemCopy_controller.itemCopy_create_post)

router.get('/itemcopy/:id/delete', itemCopy_controller.itemCopy_delete_get)
router.post('/itemcopy/:id/delete', itemCopy_controller.itemCopy_delete_post)

router.get('/itemcopy/:id/update', itemCopy_controller.itemCopy_update_get)
router.post('/itemcopy/:id/update', upload, itemCopy_controller.itemCopy_update_post)

router.get('/itemcopy/:id', itemCopy_controller.itemCopy_detail)

router.get('/itemcopies', itemCopy_controller.itemCopy_list)

module.exports = router
