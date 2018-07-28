const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');
//retreiving contacts
router.get('/contacts', (req, res, next)=>{
  //res.send('Retrieving the contact list');
  Contact.find((err, contacts)=>{
    res.json(contacts);
  });
});
//add contacts
router.post('/contact', (req, res, next)=>{
  //logic to add contact
  let newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  });

  newContact.save((err, contact)=>{
    if(err){
      res.json({msg: 'failed to add contact'});
    }
    else {
      res.json({msg: 'Contact added succesfully'});
    }
  });
});

//delete contacts
router.delete('/contact/:id', (req, res, next)=>{
  //logic to delete contact
  Contact.remove({_id:req.params.id}, (err, result)=>{
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  });
});

module.exports = router;
