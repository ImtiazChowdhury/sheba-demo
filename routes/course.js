const express = require('express');
const { queryParser, parameterParser, formParser } = require('../lib/expressParsers');
const CourseApi = require('../module/course/CourseApi');
const router = express.Router();

const courseApi = new CourseApi({ queryParser, parameterParser, formParser });

router.post("/", async (req, res, next) => {
    try {
        const result = await courseApi.create(req)
        return res.status(201).json(result);
    } catch (err) {
        next(err)
    }
})
router.get("/", async (req, res, next) => {
    try {
        const result = await courseApi.list(req)
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})
router.get("/:id", async (req, res, next) => {
    try {
        const result = await courseApi.detail(req)
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

module.exports = router;
