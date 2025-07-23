import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';


const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if(!authHeader) {
	throw new ApiError("No authorization header provided", 401);
    }
    if(!authHeader.startsWith("Bearer ")) {
	throw new ApiError("Authorization header must start with 'Bearer '", 401);
    }

    let token = authHeader.split(" ")[1];
    if(!token) {
	throw new ApiError("No token provided", 401);
    }

    try {
	const decode = jwt.verify(token, process.env.JWT_SECRET);
	req.user = decode;
	next();
	return;
    } catch(err) {
	throw new ApiError("Invalid token", 401);
    }
};

export default verifyToken;
