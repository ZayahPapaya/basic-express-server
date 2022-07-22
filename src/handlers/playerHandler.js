'use strict';
const { Player } = require('../db');
console.log(Player);
const PlayerHandler = {}

PlayerHandler.createPlayer = async (req, res) => {
  const { username, level } = req.body;
  const player = Player.build({ username, level });
  //console.log(player, "PlayerHandler");
  await player.save();
  res.status(201).send(player);
};
PlayerHandler.listPlayers = async (req, res) => {
  const players = await Player.findAll().catch(() => { throw new Error('Could not find any players') });
  res.status(200).send(players);
};
PlayerHandler.getPlayer = async (req, res) => {
  const players = await Player.findAll({ where: { id: req.params.id, } });
  console.log('Found:', players);
  if (players.length > 0) {
    res.status(200).send(players);
  } else {
    res.status(404).send(`Could not find a player with id${req.params.id}`);
  }
};
PlayerHandler.updatePlayer = async (req, res) => {
  const { username, level } = req.body;
  console.log('ID searched:', req.params.id);
  await Player.update({ username: username, level: level }, { where: { id: req.params.id, } });
  res.status(200).send(`Updated player with id: ${req.params.id}`);
};
PlayerHandler.deletePlayer = async (req, res) => {
  console.log('ID searched:', req.params.id);
  await Player.destroy({ where: { id: req.params.id, } });
  res.status(200).send(`Deleted player with id: ${req.params.id}`);
};

// TODO: delete, update
module.exports = PlayerHandler;