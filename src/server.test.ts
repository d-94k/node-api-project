import supertest from "supertest";

import app from "./app";

const request = supertest (app);

test ("GET /cats", async () => {
    const response = await request
        .get("/cats")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual([
        {name: "Ziggy"},
        {name: "Milly"}
    ])
})