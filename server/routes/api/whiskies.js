const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: './uploads/whisky_images/',
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
const Whisky = require('../../models/Whisky');

// @route GET api/whiskies
// @desc Get all whiskies
// @access Public
router.get('/', (req, res) => {
	console.log('get request to whiskies');
	console.log('res: ' + res);
	Whisky.find()
		.then(whiskies => res.json(whiskies))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/whiskies/:id
// @desc Get a specified whisky
// @access Public
router.get('/:id', (req, res) => {
	Whisky.findById(req.params.id)
		.then(whisky => res.json(whisky))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/whiskies
// @desc Create a new Whisky
// @access Public
router.post('/', upload.single('whiskyImage'), (req, res) => {
	console.log('POST REQUEST IN SERVER');
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

	const newWhisky = new Whisky({
		name: req.body.name,
		description: req.body.description,
		score: req.body.score,
		img: req.file.path,
		date: req.body.date
	});

	newWhisky.save(err => {
		if (err) {
			return res.send({
				success: false,
				message: 'Whisky not saved! Error: ' + err
			});
		}
		return res.send({
			success: true,
			message: 'Whisky added!'
		});
	});
});

// @route POST api/whiskies/:id
// @desc Delete a Whisky
// @access Public
router.delete('/:id', (req, res) => {
	Whisky.findByIdAndRemove(req.params.id)
		.then(whisky => res.json(`${whisky.name} deleted`))
		.catch(err => res.status(400).json('Error: ' + err));
});

// @route PUT api/whiskies
// @desc Update Whisky
// @access Public
router.put('/update/:id', (req, res) => {
	Whisky.findByIdAndUpdate(req.params.id).then(whisky => {
		whisky.name = req.body.name;
		whisky.description = req.body.description;
		whisky.score = req.body.score;

		whisky
			.save()
			.then(() => res.json('Whisky updated!'))
			.catch(err => res.status(400).json('Error: ' + err));
	});
});

module.exports = router;
