'use strict';
const { Player } = require('../models/playerModel');

const PlayerHandler = {};

PlayerHandler.createPlayer = async (req, res) => {
  const {username, level} = req.body;
  const player = Player.build({username, level});
  await player.save();
  res.status(200).send(user);
};
PlayerHandler.listPlayers = async (req, res) => {
  const players = await Player.findAll();
  res.status(200).send(players);
};
PlayerHandler.getPlayer = async (req, res) => {
  const players = await Player.findAll({where: { id: req.params.id,}});
  if (players.length > 0){
    res.status(200).send(player);
  } else {
    res.status(404).send(`Could not find a player with id${req.params.id}`);
  }
};

// TODO: delete, update
module.exports = PlayerHandler;