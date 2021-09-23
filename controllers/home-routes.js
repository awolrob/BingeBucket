const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment } = require('../models');
const streamData = require('./streamAPI');

router.get('/', async (req, res) => {
  const data = await streamData.getStreamList('netflix,hulu,prime,showtime,apple,paramount,disney,hbo,peacock','');
  // const data = await streamData.getItemData("tv/71728");
  // const data = await streamData.getItemData(req.params.id);
  // console.log(data);
  // console.log(`
  
  // ======================`);
  // console.log(data2);
  // console.log('======================');
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    userID: req.session.user_id,
    userName: req.session.username,
    streamData: data
  });
});

module.exports = router;