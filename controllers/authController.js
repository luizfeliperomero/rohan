import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'
import ApiError from '../utils/ApiError.js'

export const createUser = async (req, res) => {
    try {
	const plainPass = req.body.password;
	req.body.password = bcrypt.hashSync(plainPass, 10)
	const user = await User.create(req.body);
	res.status(201).json(user);
    } catch(err) {
	let msg = "";
	let statusCode = 500;
	if(err.code === 11000) {
	    msg = `Cannot save duplicate field '${Object.keys(err.keyValue)[0]}'`;
	    statusCode = 409;
	} else {
	    msg = `Unknown error ${err.code}`;
	}
	throw new ApiError(msg, statusCode);
    }
}

export const authenticate = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});

    if(!user || !bcrypt.compareSync(password, user.password)) {
	throw new ApiError("Wrong credentials", 403);
    }

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
    const userObj = user.toObject();
    delete userObj.password;
    userObj.token = token;
    res.status(200).json(userObj);
};
