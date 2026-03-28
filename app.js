//jshint esversion:6

const { Post }  = require('./Post.js');

const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { application } = require("express");
const mongoose = require("mongoose");

const fs = require('fs').promises;
const { request } = require('http');


const homeStartingContent = `Greetings, and thank you for visiting my Personal Blog!

This documentation is dedicated towards my personal projects--mostly from 10-17 years old,
providing an extensive account of the various engineering activities I have engaged in from
and early age. From AI-tracking turrets to PCB design, I have immersed myself into the vast 
landscape of intellecutal curiousity and STEM participation. 

If you have any questions or wish to implement/imitate some of the resources presented in
this project blog, feel free to reach out to me!`;

const aboutContent = `Hello!

I, Nathan Field-Patton, am a programming autodidact and engineering enthusiast with experience in
embedded engineering on various platforms. Throughout my career I have utilized autonomous systems,
low-level programming, CAD, and open-source contributions to contribute towards my unique and creative
goals. I have also worked with complex teams in engaging environments, contributing while learning.`;

const contactContent = `Personal email: nfieldpatton@email.com
Phone number: 425 215-6361
LinkedIn: https://www.linkedin.com/in/nathan-field-patton-a77bab27a/`

const app = express();
app.locals._ = _

let posts = []

app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  // Post.find({}, (err, posts) => {
  //   res.render("home", {homeStartingContent: homeStartingContent, posts: posts})
  // })
  res.render("home", {homeStartingContent: homeStartingContent, posts: posts})
})

app.get("/about", (req, res) => {
  res.render('about', {aboutContent: aboutContent})
})

app.get("/contact", (req, res) => {
  res.render('contact', {contactContent: contactContent})
})

// app.get("/compose", (req, res) => {
//   res.render('compose')
// })

// app.post("/compose", (req, res) => {
//   //{postTitle: req.body.postTitle, postBody: req.body.postBody}
//   const post = new Post({
//     postTitle: req.body.postTitle,
//     postBody: req.body.postBody
//   })
//   post.save(err => {
//     if(!err) {
//       res.redirect("/");
//     }
//   });
// })

async function readWithPath(path) {
  // fs.readFile(path, 'utf8', (err, data) => {
  // if (err) {
  //   console.error('Error reading the file:', err);
  //   return "Error reading data for this post.";
  // }
  // console.log('File content:', data);
  // return data;
  // });
  try {
    const data = await fs.readFile(path, 'utf8');
    // console.log(data);
    return data;
  } catch (err) {
    console.error('Error reading the file:', err);
    throw new Error('Error reading data for this post.'); 
  }
}

//post information


//AI turret

(async () => {
  try {

    // console.log('Content from calling function:', content);
    posts.push(new Post("AI Turret Project", await readWithPath("./public/post_text/AITurret.txt"), 0));

    //DopFlow Phantom Machine
    // posts.push(new Post("Open Source Phantom Doppler Machine", "Soon to be posted", 1));
    posts.push(new Post("Open Source Phantom Doppler Machine", await readWithPath("./public/post_text/Phantom.txt"), 1));

    //RatioZero transmission
    // posts.push(new Post("Ratio Zero Transmission", "Soon to be posted", 2));

    //Integrated room environment
    // posts.push(new Post("Integrated room ESP32 environment", "Soon to be posted", 3));
    posts.push(new Post("Integrated ESP32 environment Room", await readWithPath("./public/post_text/MorningLight.txt"), 3));

      //Main controller
      // posts.push(new Post("", "Soon to be posted", 4));

      //BLE light switch.
      // posts.push(new Post("", "Soon to be posted", 5));

      //Vent fan control.
      // posts.push(new Post("", "Soon to be posted", 6));

      //Curtain-powering rope design.
      // posts.push(new Post("", "Soon to be posted", 7));


    //Student safety tracker (IB IA)
    // posts.push(new Post("Student Safety Tracker", "", 8));
    posts.push(new Post("Student Safety Tracker", await readWithPath("./public/post_text/StudentTracker.txt"), 8));


    //go kart
    // posts.push(new Post("Small vehicle Meta-project", "", 9));
    posts.push(new Post("Small vehicle Meta-project", await readWithPath("./public/post_text/GoKart.txt"), 9));

      //turret calculations
      // posts.push(new Post("", "Soon to be posted", 10));

      //Arduino PID for yaw and pitch stepper motor system
      // posts.push(new Post("", "Soon to be posted", 11));

      //electrical routing system for directional turret
      // posts.push(new Post("", "Soon to be posted", 12));

    //Car repairs
    // posts.push(new Post("Car Repairs", "", 13));
    // posts.push(new Post("Car Repairs", await readWithPath("./public/post_text/GoKart.txt"), 13));

  } catch (err) {
    console.error('Caught error in usage:', err.message);
  }
})();

function findFirstPostWithID(id) {
  return posts.find(post => {
    if(post.getID() == id)
      return post;
  });
  //simply return null if not found in earlier return statement
}

app.get("/posts/:postId", (req, res) => {
  const requestedId = _.toString(req.params.postId);

  // console.log("retriving: " + requestedId); // fixed capitalization

  // Post.findOne({ _id: requestedId }, (err, post) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send("Server error");
  //   }

  //   if (!post) {
  //     return res.status(404).send("Post not found");
  //   }

  //   res.render("post", {
  //     postTitle: post.postTitle,
  //     postBody: post.postBody
  //   });
  // });

  let post = findFirstPostWithID(requestedId);

  if (post == null) {
    res.render('posts', "this post ID does not exist.")
  }

  res.render("post", {postTitle: post.getTitle(), postBody: post.getBody()});
})

app.listen(process.env.PORT || 3007, () => {
  console.log("Server started on port 3000");
});
