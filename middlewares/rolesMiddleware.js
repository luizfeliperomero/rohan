const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
	if(!allowedRoles.includes(req.user.role)) {
	    throw new ApiError("Access denied", 403);
	}
	next();
    }
};

export default authorizeRole;
