const express = require("express");
const ModelInstance = require("./dbConnection");
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const myPort = process.env.PORT || 8000;


//--------------------sign up code with error handling


app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // checking given email is already present or not if present then returning msg: "user is already present"

    const findinUser = await ModelInstance.findOne({ email: email });

    if (findinUser !== null) {
      return res.status(400).json({ msg: "user is already present" });
    }

    // finding email ends here


    // encoding password starts here

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(5000).json({ error: "Error generating salt" });
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(5000).json({ error: "password hashing error" });
        }

        try {
          const toAddIntoDb = new ModelInstance({
            password: hash,
            username: name,
            email: email,
          });

    // encoding password ends here

          // saved into database

          const dbRes = await toAddIntoDb.save();
          console.log(dbRes);

          // jwt token creating

          const myJwtToken = jwt.sign({ email }, "mySecreate");
          return res.json({ Token: myJwtToken });

          // responding jwt token to frontend user

        } catch (errorOcc) {
          consol.error("error occured", errorOcc);
          return res.status(500).json({ error: "Error saving to database" });
        }
      });
    });
  } catch (e) {
    console.log("error occured", e);
    return res
      .status(500)
      .json({ error: "Error occured while adding new user" });
  }
});



//--------------------sign in code with error handling



app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    //finding user using given email id

    const findinUser = await ModelInstance.findOne({ email: email });


    // if user is not present then in mongodb it returns "null"
    // if user is present then it returns that users containg all data only not returning true.

    if (findinUser === null) {
      return res.status(400).json({ error: "user not found" });
    }


    // if password does not match while compare then it returns false
    const isMatch = await bcrypt.compare(password, findinUser.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ invalidpass: "Invalid Password" });
    }

    // returning jwt token on sign in
    
    const myJwtToken = jwt.sign({ email }, "mySecreate");
    return res.json({ Token: myJwtToken });

  } catch (error) {
    console.error("Error during sign in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(myPort, () => {
  console.log(`we are in port number ${myPort}`);
});
