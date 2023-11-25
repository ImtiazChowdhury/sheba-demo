const express = require('express');
const { queryParser, parameterParser, formParser } = require('../lib/expressParsers');
const EnrollmentApi = require('../module/enrollment/EnrollmentApi');
const router = express.Router();

const enrollmentApi = new EnrollmentApi({ queryParser, parameterParser, formParser });

router.post("/", async (req, res, next) => {
    try {
        const result = await enrollmentApi.create(req)
        return res.status(201).json(result);
    } catch (err) {
        next(err)
    }
})


module.exports = router;
