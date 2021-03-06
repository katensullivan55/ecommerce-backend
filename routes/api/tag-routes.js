const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  ag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: 'Tag id not found' });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.json(404).json({ message: 'Tag id not found' });
        return;
      }
      res.json(tagData).json;
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
