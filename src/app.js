const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
	{
		"id": "9c4f9cda-39df-4fc9-b743-b75d9bc28394",
		"title": "Desafio conceitos react",
		"url": "https://github.com/angelodesalves/gostack-react-concepts-challenge",
		"techs": [
			"react"
		],
		"likes": 9
	},
	{
		"id": "081deb83-2dee-4595-920f-aa8132fa9b60",
		"title": "Desafio conceitos Node",
		"url": "https://github.com/angelodesalves/gostack-react-concepts-challenge",
		"techs": [
		"Node",
			"Express"
		],
		"likes": 13
	},
	{
		"id": "159eb0dd-cd69-49ee-8395-5170d2e51f11",
		"title": "Desafio conceitos Node Native",
		"url": "https://github.com/angelodesalves/gostack-react-concepts-challenge",
		"techs": [
			"React",
			"React Native",
			"Android",
			"IOS"
		],
		"likes": 7
	},
	{
		"id": "0efd10fe-4247-4bf9-8865-f5183745e65f",
		"title": "Conceitos Typescript",
		"url": "https://github.com/angelodesalves/gostack-react-concepts-challenge",
		"techs": [
			"Typescript"
		],
		"likes": 21
	}
];

const valideIdRepository = (request, response, next) => {
	const { id } = request.params;

	if (!isUuid(id)) {
		return response.status(400).json({ error: "Invalied repository id" });
	}

	return next();
}

app.use('/repositories/:id', valideIdRepository);

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
	const { title, url, techs } = request.body,
		repository = {
			id: uuid(),
			title,
			url,
			techs,
			likes: 0
		}

	repositories.push(repository);
	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;
	const repositoryIndex = repositories.findIndex(repository => repository.id === id);

	if (repositoryIndex < 0) {
		return response.status(400).json({ error: "Repository not found" });
	}

	const repository = {
		title,
		url,
		techs
	}

	repositories[repositoryIndex] = Object.assign(repositories[repositoryIndex], repository);

	return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const repositoryIndex = repositories.findIndex(repository => repository.id === id);

	if (repositoryIndex < 0) {
		return response.status(400).json({ error: "Repository not found" });
	}

	repositories.splice(repositoryIndex, 1);

	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
	const { id } = request.params;
	const repositoryIndex = repositories.findIndex(repository => repository.id === id);

	if (repositoryIndex < 0) {
		return response.status(400).json({ error: "Repository not found" });
	}

	repositories[repositoryIndex].likes++;

	return response.json(repositories[repositoryIndex]);
});

module.exports = app;
