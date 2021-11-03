const 
    router = require('express').Router(),
    auth = require('../middleware/auth'),
    notesCtrl = require('../controllers/noteCtrl');

router.route('/')
    .get(auth ,notesCtrl.getNotes)
    .post(auth ,notesCtrl.createNote);

router.route('/:id')
    .get(auth ,notesCtrl.getNote)
    .put(auth ,notesCtrl.updateNote)
    .delete(auth ,notesCtrl.deleteNote);

module.exports = router;