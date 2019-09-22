const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: './uploads/beer_images/',
	filename: function(req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

// const UserSession = require('../../models/UserSession');

// Item Model
const Beer = require('../../models/Beer');

// @route GET api/beers
// @desc Get all beers
// @access Public
router.get('/', (req, res) => {
	console.log('get request to beers');
	console.log('res: ' + res);
	Beer.find()
		.then(beers => res.json(beers))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/beers/:id
// @desc Get a specified beer
// @access Public
router.get('/:id', (req, res) => {
	Beer.findById(req.params.id)
		.then(beer => res.json(beer))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/beers
// @desc Create a new Beer
// @access Public
router.post('/', upload.single('itemImage'), (req, res) => {
	console.log('BEER POST REQUEST IN SERVER');
	console.log(req.file);

	if (!req.body.name) {
		console.log('NO NAME');
		return res.send({
			success: false,
			message: 'Error: Missing Name'
		});
	}
	if (!req.body.score) {
		console.log('NO SCORE');
		return res.send({
			success: false,
			message: 'Error: Missing score'
		});
	}

	const newBeer = new Beer({
		name: req.body.name,
		description: req.body.description,
		score: req.body.score,
		img: req.file.path,
		date: req.body.date
	});

	newBeer.save(err => {
		if (err) {
			return res.send({
				success: false,
				message: 'Beer not saved! Error: ' + err
			});
		}
		return res.send({
			success: true,
			message: 'Beer added!'
		});
	});
});

// @route POST api/beers/:id
// @desc Delete a Beer
// @access Public
router.delete('/:id', (req, res) => {
	Beer.findByIdAndRemove(req.params.id)
		.then(beer => res.json(`${beer.name} deleted`))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route PUT api/beers
// @desc Update Beer
// @access Public
router.put('/update/:id', (req, res) => {
	Beer.findByIdAndUpdate(req.params.id).then(beer => {
		beer.name = req.body.name;
		beer.description = req.body.description;
		beer.score = req.body.score;

		beer.save()
			.then(() => res.json('Beer updated!'))
			.catch(err => res.status(400).json('Error: ' + err));
	});
});

module.exports = router;
