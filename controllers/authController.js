import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'

export const createUser = async (req, res) => {
    try {
	const plainPass = req.body.password;
	req.body.password = bcrypt.hashSync(plainPass, 10)
	const user = await User.create(req.body);
	res.status(201).json(user);
    } catch(err) {
	res.status(400).json(err);
    }
}

export const authenticate = async (req, res) => {
    const { email, password } = req.body;
    try {
	const user = await User.findOne({email: email});
	if(bcrypt.compareSync(password, user.password)) {
	    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
	    const userObj = user.toObject();
	    delete userObj.password;
	    userObj.token = token;
	    res.status(200).json(userObj);
	} else {
	    res.status(403).send("Wrong credentials");
	}
    } catch(err) {
	res.status(403).send("Wrong credentials");
    }
};
