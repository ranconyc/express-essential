const express = require("express");
const data = require("./data/data.json");

const app = express();
const PORT = 3000;

//this is for the public folder on path /
app.use(express.static("public"));

//this is for the images folder on path /images
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  //get data first
  res.json(data);
});

app.get(
  "/user/:id",
  (req, res, next) => {
    //get data first
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
  },
  (req, res) => console.log(`Did you get the right data?`)
);
// downloading a file
app.get("/images", (req, res) => res.download("./images/stitch.jpeg"));
//rederacting to Different url
app.get("/linkedin", (req, res) => res.redirect("http://linkedin.com"));

//Chaining
app
  .route("/item")
  .get((req, res) => {
    res.send(`a get request with '/item' route on port ${PORT}`);
  })
  .put((req, res) => {
    res.send(`a put request with '/item' route on port ${PORT}`);
  })
  .delete((req, res) => {
    res.send(`a delete request with '/item' route on port ${PORT}`);
  });

app.listen(PORT, () => {
  console.log(`server is running in port: ${PORT}`);
  console.log(data);
});
