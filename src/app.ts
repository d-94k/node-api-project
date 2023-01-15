import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";
import { validate, validationErrorMiddleware, planetSchema, PlanetData } from "./validation";

const app = express ();
app.use(express.json());

app.get ("/cats", async (request, response) => {
    const planets = await prisma.planet.findMany ();
    response.json (planets);
});

app.get ("/cats/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id)
    const planet = await prisma.planet.findUnique({
        where: {id: planetId}
    });
    if (!planet) {
        response.status(404);
        return next ('Cannot GET /cats/' + planetId);
    };
    response.json (planet);
});

app.post ("/cats", validate ({body: planetSchema}), async (request, response) => {
    const planetData: PlanetData = request.body;
    const planet = await prisma.planet.createMany ({
        data: planetData
    })
    response.status(201).json(planet);
});

app.put ("/cats/:id(\\d+)", validate ({body: planetSchema}), async (request, response, next) => {
    const planetData: PlanetData = request.body;
    const planetId = Number (request.params.id);
    try {
    const planet = await prisma.planet.update ({
        where: {id: planetId},
        data: planetData
    })
    response.status(200).json(planet);
    } catch (error) {
        response.status(404);
        next ('Cannot PUT /planets/' + planetId);
    }
});

app.use(validationErrorMiddleware);

export default app;