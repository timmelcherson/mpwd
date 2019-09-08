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
	Whisky.find().then(whiskies => res.json(whiskies));
});

// @route POST api/whiskies
// @desc Create a new Whisky
// @access Public
router.post('/', upload.single('whiskyImage'), (req, res) => {
	console.log("POST REQUEST IN SERVER");
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

	// let img;

	// switch (req.body.name) {
	// 	case 'Talisker':
	// 		img = 'assets/images/talisker.jpg';
	// 		break;
	// 	case 'Aberlour':
	// 		img = 'assets/images/aberlour.jpg';
	// 		break;
	// 	case 'Glenlivet':
	// 		img = 'assets/images/glenlivet.jpg';
	// 		break;
	// 	case 'Laphroaig':
	// 		img = 'assets/images/laphroaig.jpg';
	// 		break;
	// 	case 'Bunnahabhain':
	// 		img = 'assets/images/bunnahabhain.jpg';
	// 		break;
	// }

	const newWhisky = new Whisky({
		name: req.body.name,
		description: req.body.description,
		score: req.body.score,
		img: req.file.path
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

module.exports = router;
