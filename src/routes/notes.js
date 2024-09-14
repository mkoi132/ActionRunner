const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;

  // Check for the special case
  if (title.toLowerCase() === 'matt') {
    description = 'Is the best lecturer';
  }

  let note = new Note({
    title: title,
    description: description,
  });

  try {
    await note.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.render('new');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
});

module.exports = router;
