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

let players = [
    {
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
      name: req.body.name,
      number: req.body.number,
      position: req.body.position,
      year: req.body.year,
    };

  if (req.file) {
    player.image = "images/" + req.file.filename;
    console.log("Image request");
  }

  console.log("Hello");
  players.push(player);
  console.log(player);
  res.status(200).send(player);
});

/*
app.put("/api/players/:id", upload.single("img"), (req, res) => {
  let player = players.find((h) => h._id === parseInt(req.params.id));

  if (!player) res.status(400).send("Player not found");

  const result = validatePlayer(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  if (req.file) {
    player.image = "images/" + req.file.filename;
  }
  res.send(player);
});
*/

/*
app.delete("/api/players/:id", (req, res) => {
  const player = players.find((h) => h._id === parseInt(req.params.id));

  if (!player) {
    res.status(404).send("The player was not found");
  }

  const index = players.indexOf(player);
  players.splice(index, 1);
  res.send(player);
});
*/

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