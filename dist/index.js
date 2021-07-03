"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = express_1.default();
// middleware
app.use(express_1.default.json());
dotenv_1.default.config();
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];
var validateCourse = function (course) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    return schema.validate(course);
};
app.get("/" /* endpoint, which is root */, function (req, res) {
    res.send("Hello World");
});
app.get("/api/courses", function (req, res) {
    res.send(courses);
});
app.get("/api/courses/:id", function (req, res) {
    // we define params using :param in the uri
    // params are required to reach this endpoint while queries are optional
    var id = req.params.id;
    var course = courses.find(function (c) { return c.id === parseInt(id); });
    if (!course)
        return res.status(404).send("The course with the given ID was not found");
    // 404 Not Found
    else
        res.send(course);
});
app.post("/api/courses", function (req, res) {
    var error = validateCourse(req.body).error;
    if (error)
        return res.status(400).send(error);
    var course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});
app.put("/api/courses/:id", function (req, res) {
    var id = req.params.id;
    var course = courses.find(function (c) { return c.id === parseInt(id); });
    if (!course)
        return res.status(404).send("The course with the given ID was not found");
    var error = validateCourse(req.body).error;
    if (error)
        return res.status(400).send(error);
    // Update course
    course.name = req.body.name;
    res.send(course);
});
app.delete("/api/courses/:id", function (req, res) {
    var id = req.params.id;
    var course = courses.find(function (c) { return c.id === parseInt(id); });
    if (!course)
        return res.status(404).send("The course with the given ID was not found");
    var index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
