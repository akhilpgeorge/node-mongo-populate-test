const fileUpload = require('express-fileupload');
const async = require("async");
const express = require('express');3
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());



var {User, Profile} = require('./../models/user');
var {mongoose} = require('./../db/mongoose');

app.use(fileUpload());

var getUsers = (req,res)=> {
  Profile.find().populate('user').then((data) => {
    res.status(200).send(data);
  }, (e) => {
    res.status(400).send();
  });
}


var createUsers = (req,res) => {
  console.log("mimetype: ",req.files.usersFile.mimetype);
  if (req.files.usersFile.mimetype != 'application/json') {
    return res.status(400).send('file type error');
  }
  var buffjson = JSON.parse(req.files.usersFile.data.toString());

  var users = buffjson.users;

    async.each(users, (userObj,cb) => {

            var user = new User({
                name: userObj.name,
                age: userObj.age,
                email: userObj.email
              });
            user.save().then((doc) => {
              var profile = new Profile({
                    user: doc._id,
                    address: userObj.profile.address,
                    phone_number:userObj.profile.phone_number,
                    blood_group:userObj.profile.blood_group,
                    full_name:userObj.profile.full_name
                  });

            profile.save().then((doc) => {
              cb();

            }, (e) => {
              cb(e);

            });
            }, (e) => {
              cb(e);
            });

    }, (e) => {
      if (e) {
        return res.status(400).send("user creation failed: "+e.errmsg);
      }
      res.status(200).send("user creation success");
    });
}


module.exports = {
  getUsers,
  createUsers
}
