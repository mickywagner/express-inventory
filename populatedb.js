#! /usr/bin/env node


console.log('This script populates some test categories, items, item copies to your database. Specified database as argument - mongodb+srv://mickywagner:0l0r1neruvande@cluster0-7ldco.gcp.mongodb.net/inventory_app?retryWrites=true&w=majority');

var async = require('async')
var Category = require('./models/category')
var Item = require('./models/item')
var ItemCopy = require('./models/itemcopy')

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://mickywagner:0l0r1neruvande@cluster0-7ldco.gcp.mongodb.net/inventory_app?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var categories = []
var items = []
var itemcopies = []

function categoryCreate(name, description, cb) {
    categorydetail = {
        name: name, 
        description: description
    }

    var category = new Category(categorydetail)

    category.save(function(err) {
        if(err) {
            cb(err, null)
            return
        }
        console.log('New Category: ' + category)
        categories.push(category)
        cb(null, category)
    })
}

function itemCreate(category, name, description, rarity, damage, cb) {
    itemdetail = { 
      name: name,
      description: description,
      catgory: category,
      rarity: rarity,
    }
   
    if (damage != false) itemdetail.damage = damage
    if (category != false) itemdetail.category = category
      
    var item = new Item(itemdetail);    
    item.save(function (err) {
      if (err) {
        console.log('ERROR CREATING item: ' + item)
        cb(err, null)
        return
      }
      console.log('New Item: ' + item);
      items.push(item)
      cb(null, item)
    }  );
}
  
function itemCopyCreate(item, price, weight, status, cb) {
    itemcopydetail = {
        item: item,
        status: status
    }

    if(price != false) itemcopydetail.price = price
    if(weight != false) itemcopydetail.weight = weight
   

    var itemcopy = new ItemCopy(itemcopydetail)
    itemcopy.save(function(err) {
        if(err) {
            console.log('ERROR CREATING ItemCopy: ' + itemcopy)
            cb(err, null)
            return
        }
        console.log('New ItemCopy: ' + itemcopy)
        itemcopies.push(itemcopy)
        cb(null, item)
    })
}

function createCategories(cb) {
    async.series([
        function(callback) {
            categoryCreate('Weapons', 'Every weapon is classified as either melee or ranged. A melee weapon is used to Attack a target within 5 feet of you, whereas a ranged weapon is used to Attack a target at a distance.', callback)
        },
        function(callback) {
            categoryCreate('Adventuring Gear', 'Adventuring gear is the miscellaneous category of equipment other than armor, weapons, alchemical items, and leveled magic items. Items with simple magical effects, such as everburning torches, journeybread, and sunrods, are also classified as adventuring gear.', callback)
        },
        function(callback) {
            categoryCreate('Trinkets', 'Simple items lightly touched by mystery.', callback)
        } 
    ], cb)
}

function createItems(cb) {
    async.parallel([
        function(callback) {
            itemCreate(categories[0], 'Item 1', 'Item 1 description', 'Common', '1d4 slashing', callback)
        },
        function(callback) {
            itemCreate(categories[1], 'Knife', 'A knife has a small single-edged blade, usually used as cutlery or woodworking tool, but sometimes pressed into service as a concealable weapon.', 'Common', '1d3 slashing', callback)
        },
        function(callback) {
            itemCreate(categories[1], 'Yo-Yo', 'This odd contraption consists of two metallic disks connected to an axle with a ball-bearing. Tied to the axle is a long string that stretches to five feet when unraveled.', 'Common', '1d6 bludgeoning', callback)
        },
        function(callback) {
            itemCreate(categories[1], 'Torch Staff', 'A torch staff is a polearm with a heavy weighted head, often flanged. The head contains a hollow designed to hold a bundle of hessian coated in sulfur and lime that can be ignited like a torch. It emits bright light in a 20-foot radius and dim light for an additional 20 feet. The flame persists for 1 hour and burns even in heavy rain.', 'Common', '1d6 bludgeoning', callback)
        },
        function(callback) {
            itemCreate(categories[2], 'Eagle quill', 'Beautifully crafted quill.', 'Rare', false, callback)
        }

    ], cb)
}



// name, description, rarity, damage, category

function createItemCopies(cb) {
    async.parallel([
        function(callback) {
            itemCopyCreate(items[0], 4, 3, 'Available', callback)
        }, 
        function(callback) {
            itemCopyCreate(items[1], 2, 0.25, 'On Order', callback)
        },   
        function(callback) {
            itemCopyCreate(items[2], 5, 0.33, 'Available', callback)
        },    
     

    ], cb)
}

async.series([
    createCategories,
    createItems,
    createItemCopies
],
function(err, results) {
    if(err) {
        console.log('FINAL ERR: ' + err)
    } else {
        console.log('ITEMCopies: ' + itemcopies)
    }
    mongoose.connection.close()
})