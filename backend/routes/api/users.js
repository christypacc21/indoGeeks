const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
let User = require('../../models/user.model');



// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			console.log('name: ', req.body.name);
			console.log('email: ', req.body.email);
			console.log('password: ', req.body.password);
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});




// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
	const { errors, isValid } = validateLoginInput(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	console.log('req.body.email: ', req.body.email);
	const password = req.body.password;
	console.log('req.body.password: ', req.body.password);

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Email not found" });
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name
				};
				// Sign token
				jwt.sign(
					payload,
					process.env.SECRET_OR_KEY,
					{
						expiresIn: 15778463 // 0.5 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});




// api/users/ (GET)
router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


// api/users/:id (GET)
router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(err => res.status(400).json('Error: ' + err));
});


// api/users/:id (DELETE)
router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted'))
		.catch(err => res.status(400).json('Error: ' +  err));
});


// api/users/update/:id (POST)
router.route('/update/:id').post((req, res) => {
	User.findById(req.params.id)
		.then(user => {
			// user.email is static for each user and cannot be changed
			user.password = req.body.password;
			user.name = req.body.name;

			user.save()
				.then(() => res.json(`User No.${user.id} updated!`))
				.catch(err => res.status(400).json('Error while saving model: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});


// // api/users/add (POST)
// router.route('/add').post((req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	const name = req.body.name;

//   const newUser = new User({
// 		email,
// 		password,
// 		name,
// 	});

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;