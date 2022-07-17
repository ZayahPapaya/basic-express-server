'use strict';
const { Item } = require('../db');

const ItemHandler = {};

ItemHandler.createItem = async (req, res) => {
  const {name, alc} = req.body;
  const item = Item.build({name, alc});
  await item.save();
  res.status(201).send(item);
};
ItemHandler.listItems = async (req, res) => {
  const items = await Item.findAll();
  res.status(200).send(items);
};
ItemHandler.getItem = async (req, res) => {
  console.log('ID searched:', req.params.id);
  const items = await Item.findAll({where: { id: req.params.id,}});
  console.log('Found:', items);
  if (items.length > 0){
    res.status(200).send(items);
  } else {
    res.status(404).send(`Could not find a item with id${req.params.id}`);
  }
};
ItemHandler.updateItem = async (req, res) => {
  const { name, alc } = req.body;
  console.log('ID searched:', req.params.id);
  await Item.update({ name: name, alc: alc }, { where: { id: req.params.id, } });
  res.status(200).send(`Updated item with id: ${req.params.id}`);
};
ItemHandler.deleteItem = async (req, res) => {
  console.log('ID searched:', req.params.id);
  await Item.destroy({where: { id: req.params.id,}});
  res.status(200).send(`Deleted item with id${req.params.id}`);
};

// TODO: delete, update
module.exports = ItemHandler;