'use strict';
const { Item } = require('../models/itemModel');

const ItemHandler = {};

ItemHandler.createItem = async (req, res) => {
  const {name, alc} = req.body;
  const item = Item.build({name, alc});
  await item.save();
  res.status(200).send(item);
};
ItemHandler.listItems = async (req, res) => {
  const items = await Item.findAll();
  res.status(200).send(items);
};
ItemHandler.getItem = async (req, res) => {
  const items = await Item.findAll({where: { id: req.params.id,}});
  if (items.length > 0){
    res.status(200).send(items);
  } else {
    res.status(404).send(`Could not find a item with id${req.params.id}`);
  }
};

// TODO: delete, update
module.exports = ItemHandler;