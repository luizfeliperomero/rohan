import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
	const limit = parseInt(req.query.limit);
	const users = await User.find().sort({ name: 1 }).limit(isNaN(limit) || limit < 0 ? 0 : limit);
	res.status(200).json(users);
    } catch(err) {
	res.json(err);
    }
}
