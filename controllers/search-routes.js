const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment } = require('../models');
const streamData = require('./streamAPI');

router.get("/", async (req, res) => {
  res.render("search")
})

router.post('/', async (req, res) => {
  // console.log(`
  
  // server side` , req.body.service, req.body.searchText)

  const data = await streamData.getStreamList(req.body.service, req.body.searchText);
  // console.log(`
  
  // render the search page
  
  // `);

  res.json(data)
});

router.get('/search/:id', async (req, res) => {
  // const data = await streamData.getStreamList('netflix,hulu,prime,showtime,apple,paramount,disney,hbo,peacock');
  const data = await streamData.getItemData(req.params.id);
  // console.log(data);
  // console.log(`
  
  // ======================`);
  // // console.log(data2);
  // console.log('======================');
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    streamData: [data]
  });
});

module.exports = router;