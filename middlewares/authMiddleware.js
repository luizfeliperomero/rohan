import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")) {
	token = authHeader.split(" ")[1];
	if(!token) {
	    return res.status(401).json({ message: "No token provided"})
	}
	try {
	    const decode = jwt.verify(token, process.env.JWT_SECRET);
	    req.user = decode;
	    next();
	    return;
	} catch(err) {
	    return res.status(401).json({message: "Invalid token"});
	}
    } else {
	return res.status(401).json({ message: "No token provided"})
    }
};

export default verifyToken;
