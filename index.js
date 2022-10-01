const express = require("express");
const request = require("request");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const hash = require("./util/hash");
// const validateRegisterInput = require("./validation/register");
// const validateLoginInput = require("./validation/login");

const app = express();

app.use(express.static(__dirname + "/public"));

const User = require("./models/UserSchema");

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/sign-in.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/registration.html");
});

app.post("/register", (req, res) => {
  //   const { errors, isValid } = validateRegisterInput(req.body);

  let email = req.body.email;
  let password = req.body.password;

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  let hashed_password = hash(password);

  (async function() {
    User.findOne({
      email: email
    }).then((user) => {

      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        const newUser = new User({
          password: hashed_password,
          email: email,
        });
        newUser.save();
      }
    });

    let data = {}
    data.email = await email
    data.password = await password
    data.hashed_password = await hashed_password
    console.log(data);
  })()

});

// redirect to failure
app.get("/failure", (req, res) => {
  res.sendFile(__dirname + "/public/failure.html");
});

// redirect to success
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/public/success.html");
});

app.post("/login-validator", (req, res) => {
  //   const { errors, isValid } = validateLoginInput(req.body);

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by Email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    hashed_password = hash(password);

    console.log(user);

    // // Check password
    // bcrypt.compare(password, user.password).then((isMatch) => {
    //   if (isMatch) {
    //     // Create JWT Payload
    //     const payload = {
    //       id: user.id,
    //       name: user.name,
    //     };

    //     // Sign token
    //     jwt.sign(
    //       payload,
    //       keys.secretOrKey,
    //       {
    //         expiresIn: 31556926,
    //       },
    //       (err, token) => {
    //         res.json({
    //           success: true,
    //           token: "Bearer " + token,
    //         });
    //       }
    //     );
    //   } else {
    //     return res
    //       .status(400)
    //       .json({ passwordincorrect: "Password incorrect" });
    //   }
    // });
  });
});

app.listen(PORT, () => {
  console.log("listening at localhost:" + PORT);
});
