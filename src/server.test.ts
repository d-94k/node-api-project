import supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest (app);

test ("GET /cats", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 5678,
            moons: 0,
            createdAt: "2023-01-11T11:31:21.982Z",
            updatedAt: "2023-01-11T11:30:31.479Z"
        }
    ];

    // @ts-ignore
    prismaMock.planet.create.mockResolvedValue(planets);

    const response = await request
        .get("/cats")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(planets)
});

test ("POST /cats", async () => {
    const planet = {
            name: "Jupiter",
            description: null,
            diameter: 5678,
            moons: 0
        };

    const response = await request
        .post("/cats")
        .send(planet)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(planet)
});