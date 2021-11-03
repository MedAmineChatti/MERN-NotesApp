const { findOneAndUpdate } = require('../models/noteModel');

const 
      Notes = require('../models/noteModel'),
      noteCtrl = {
            getNotes : async(req,res) => {
              try {

                const notes = await Notes.find({user_id : req.user.id});

                res.json(notes);
                
              } catch (err) {

                return res.status(500).json({msg : err.message});

              }
            },
            createNote : async(req,res) => {
                try {
  
                 const {title,content} = req.body;

                 const newNote = new Notes ({
                     title,
                     content,
                     user_id : req.user.id,
                     name : req.user.name
                 })
                  
                  // Save mongodb
                 await newNote.save();
                 
                 res.json({msg : "Created a Note"});

                } catch (err) {
  
                  return res.status(500).json({msg : err.message});
  
                }
            },
            deleteNote :  async(req,res) => {
                try {
                    await Notes.findOneAndDelete(req.params.id);

                    res.json({msg: "Deleted Note"});
                    
                } catch (err) {
                    return res.status(500).json({msg : err.message});
                }
            },
            updateNote :  async(req,res) => {
                try {
                    const {title,content} = req.body;

                    await Notes.findOneAndUpdate({_id : req.params.id},{
                        title,
                        content
                    });

                    res.json({msg : "Update a Note"});

                } catch (err) {
                    return res.status(500).json({msg : err.message});
                }
            },
            getNote :  async(req,res) => {
                try {
                    const note = await Notes.findById(req.params.id);

                    res.json(note);
                    
                } catch (err) {
                    return res.status(500).json({msg : err.message});
                }
            }       
    }

module.exports = noteCtrl;