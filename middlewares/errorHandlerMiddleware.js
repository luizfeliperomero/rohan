import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {

    if(!(err instanceof ApiError)) {
	err = new ApiError(err, 500);
    }

    res.status(parseInt(err.statusCode))
	.json({
	    message: err.message,
	    details: err.details
	});
}

export default errorHandler;
