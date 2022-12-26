const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
app.use(express.json());
const moviData = require("./data.json");
// app.use(handleError)

////////////////////////////////////////////////////////////////////
// get from json fie
app.get("/", homeHandler);

function homeHandler(req, res) {
  myData = new Movie(moviData);

  res.json(myData);
}

function Movie(data) {
     (this.title = data.title), (this.overview = data.overview);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// axios get all

app.get("/trending", getHandler);
function getHandler(req, res) {
  url =
    "https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US";
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((result) => {
      // console.log(result.data.results , "kkkkkkk")
      data = result.data.results;
      myData = data.map((e) => {
        return new Movie(e);
      });
      res.json(myData);
    })

    .catch((err) => {
      console.log(err);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////
// get one by id

app.get("/trending/:id", getHandler);
function getHandler(req, res) {
  url =
    "https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US";
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((result) => {
      id = req.params.id;

      console.log(result.data.results);
      data = result.data.results;
      myData = data.map((e) => {
        if (e.id == id) {
          console.log(new Movie(e));
          return new Movie(e);
        }
      });
      res.json(myData);
    })

    .catch((result) => {
      console.log(result);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//axios search

app.get("/search", searchHandler);
function searchHandler(req, res) {
  n = req.query.p; // p in postman
  url = `https://api.themoviedb.org/3/search/movie?api_key=5ccf75088cf2cb9dc0801bc19f16f285&language=en-US&query=${n}&page=2`;
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((result) => {
      data = result.data.results;
      console.log(data);
      res.json(data);

      //     console.log(result);
    })
    .catch((result) => {
      console.log(result);
    });
}

// function handleeror
// function handleError(err, req, res) {
//      res.status(500).send(err); 


// }

port = process.env.PORT;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
