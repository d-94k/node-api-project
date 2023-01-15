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

app.post ("/cats", validate ({body: planetSchema}), async (request, response) => {
    const planetData: PlanetData = request.body;
    const planet = await prisma.planet.createMany ({
        data: planetData
    })
    response.status(201).json(planet);
});

app.use(validationErrorMiddleware);

export default app;