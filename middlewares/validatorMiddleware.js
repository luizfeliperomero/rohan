import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const result = validationResult(req);
    if(result.isEmpty()) {
	next();
	return;
    }
    const details = result.array().map(err => ({
	field: err.path,
	message: err.msg
    }));
    res.status(400).json({ message: "Validation Error", details: details });
}
