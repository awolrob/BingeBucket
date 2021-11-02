const router = require("express").Router();
const { User, Feature, Comment, Review } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Feature.findAll({
    where: {
      id: req.params.id,
    }
  })
    .then((dbFeatureData) => res.json(dbFeatureData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.get("/:id", (req, res) => {
  Feature.findOne({
    where: {
      id: req.params.id,
    }

  })
    .then((dbFeatureData) => res.json(dbFeatureData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/bucket', (req, res) => {
  if (!(typeof req.session.user_id === 'undefined')) {
    Feature.create({
      id: req.body.id,
      imdb_id: req.body.imdb_id,
      user_id: req.session.user_id,
      title: req.body.title
    })
      .then(dbFeatureData => res.json(dbFeatureData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  };
});
module.exports = router;
