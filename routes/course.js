const express = require('express');
const CourseModule = require('../module/course/courseModule');
const { queryParser, parameterParser, formParser } = require('../lib/expressParsers');
const router = express.Router();

const courseModule = new CourseModule({ queryParser, parameterParser, formParser });

router.post("/", async (req, res, next) => {
    try {
        const result = await courseModule.create(req)
        return res.status(201).json(result);
    } catch (err) {
        next(err)
    }
})
router.get("/", async (req, res, next) => {
    try {
        const result = await courseModule.list(req)
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})
router.get("/:id", async (req, res, next) => {
    try {
        const result = await courseModule.detail(req)
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

module.exports = router;
