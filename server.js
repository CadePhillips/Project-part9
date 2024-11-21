const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
/*
let players = [
    {
    _id: 1,
    "image": "images/player-pics/kimball-pic.webp",
    "name": "Roman Kimball",
    "number": "2",
    "position": [
    "Right Handed Pitcher "
    ],
    "year": "Redshirt Sophomore",
    "hometown": "New Hartford, N.Y.",
    "previousschool": "Notre Dame",
    "height": "5-11",
    "weight": "185",
    "bats": "Right",
    "throws": "Right"
    },
    {
    _id: 2,
    "image": "images/player-pics/ellis-pic.webp",
    "name": "Lee Ellis",
    "number": "3",
    "position": [
    "Middle Infield ",
    "Third Base "
    ],
    "year": "Freshman",
    "hometown": "White Plains, M.D.",
    "previousschool": "None",
    "height": "5-11",
    "weight": "170",
    "bats": "Right",
    "throws": "Right"
    },
    {
    _id: 3,
    "image": "images/player-pics/phipps-pic.webp",
    "name": "Jackson Phipps",
    "number": "4",
    "position": [
    "Left Handed Pitcher "
    ],
    "year": "Redshirt Junior",
    "hometown": "Dallas, G.A.",
    "previousschool": "None",
    "height": "6-4",
    "weight": "225",
    "bats": "Left",
    "throws": "Left"
    },
    {
    _id: 4,
    "image": "images/player-pics/lecroy-pic.webp",
    "name": "Talmadge Lecroy",
    "number": "5",
    "position": [
    "Third Base ",
    "Middle Infield ",
    "Catcher"
    ],
    "year": "Junior",
    "hometown": "Belton, S.C.",
    "previousschool": "None",
    "height": "6-2",
    "weight": "205",
    "bats": "Right",
    "throws": "Right"
    },
    {
    _id: 5,
    "image": "images/player-pics/jackson-pic.webp",
    "name": "Blake Jackon",
    "number": "6",
    "position": [
    "Outfield ",
    "First Base"
    ],
    "year": "Junior",
    "hometown": "Coppel, T.X.",
    "previousschool": "Charlotte",
    "height": "6-0",
    "weight": "195",
    "bats": "Left",
    "throws": "Left"
    },
    {
    _id: 6,
    "image": "images/player-pics/jones-pic.webp",
    "name": "Kennedy Jones",
    "number": "7",
    "position": [
    "Outfield "
    ],
    "year": "Junior",
    "hometown": "Norfolk, V.A.",
    "previousschool": "UNC Greensboro",
    "height": "6-1",
    "weight": "220",
    "bats": "Right",
    "throws": "Right"
    }
    ];
*/

app.get("/api/players", (req, res) => {
  res.send(players);
});


app.post("/api/players", upload.single("img"), (req, res) => {
  console.log("Sending request");

  const result = validatePlayer(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    console.log("400 Error");
    return;
  }

  const player = {
      _id: players.length + 1,
      name: req.body.name,
      number: req.body.number,
      position: req.body.position,
      year: req.body.year,
    };

  if (req.file) {
    player.image = "images/" + req.file.filename;
    console.log("Image request");
  }

  players.push(player);
  console.log(player);
  res.status(200).send(player);
});


app.put("/api/players/:id", upload.single("img"), (req, res) => {
  const player = players.find((p) => p._id === parseInt(req.params.id));
  console.log(req.params.id);
  
  if (!player){ 
    res.status(400).send("Player was not found");
    return;
  }

  const result = validatePlayer(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  player.name = req.body.name;
  player.number = req.body.number;
  player.position = req.body.position;
  player.year = req.body.year;

  if (req.file) {
    player.image = "images/" + req.file.filename;
  }
  
  res.status(200).send(player);
});



app.delete("/api/players/:id", (req, res) => {
  const player = players.find((player) => player._id === parseInt(req.params.id));
  console.log("hello");

  for(let i in players){
    console.log(players[i]);
  }

  if (!player) {
    res.status(404).send("Player was not found");
    console.log("404 error");
    return;
  }

  console.log("test");

  const index = players.indexOf(player);
  players.splice(index,1);
  res.status(200).send(player);
});


const validatePlayer = (player) => {
  const schema = Joi.object({
    name:Joi.string().required(),
    number:Joi.number().required(),
    position:Joi.string().required(),
    year:Joi.string().required()
  });
  return schema.validate(player);
};


app.listen(3002, () => {
  console.log("I'm listening");
});