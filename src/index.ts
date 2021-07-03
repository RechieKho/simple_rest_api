import Joi, { ValidationResult } from "joi";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
const app = express();

// middleware
app.use(express.json());

dotenv.config();
const { PORT = 3000 } = process.env;

/**
 * app.get deals with get request
 * app.post deals with post request
 * app.put deals with put request
 * app.delete deals with delete req
 */

// Request and Response object can always refer
// to express website: https://expressjs.com/en/4x/api.html

interface Course {
	id: number;
	name: string;
}
const courses: Course[] = [
	{ id: 1, name: "course1" },
	{ id: 2, name: "course2" },
	{ id: 3, name: "course3" },
];

const validateCourse = (course: object): ValidationResult => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate(course);
};

app.get("/" /* endpoint, which is root */, (req: Request, res: Response) => {
	res.send("Hello World");
});

app.get("/api/courses", (req: Request, res: Response) => {
	res.send(courses);
});

app.get("/api/courses/:id", (req: Request, res: Response) => {
	// we define params using :param in the uri
	// params are required to reach this endpoint while queries are optional
	const { id } = req.params;
	const course = courses.find((c) => c.id === parseInt(id));
	if (!course)
		return res.status(404).send("The course with the given ID was not found");
	// 404 Not Found
	else res.send(course);
});

app.post("/api/courses", (req: Request, res: Response) => {
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error);

	const course: Course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

app.put("/api/courses/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const course = courses.find((c) => c.id === parseInt(id));
	if (!course)
		return res.status(404).send("The course with the given ID was not found");

	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error);

	// Update course
	course.name = req.body.name;
	res.send(course);
});

app.delete("/api/courses/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const course = courses.find((c) => c.id === parseInt(id));
	if (!course)
		return res.status(404).send("The course with the given ID was not found");

	const index = courses.indexOf(course);
	courses.splice(index, 1);
	res.send(course);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
