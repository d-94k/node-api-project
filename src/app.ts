import express from "express";
import "express-async-errors";

const app = express ();

app.get ("/cats", (request, response) => response.json ([
    {name: "Ziggy"},
    {name: "Milly"}
]));

export default app;