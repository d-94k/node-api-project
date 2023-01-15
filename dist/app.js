"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = __importDefault(require("./lib/prisma/client"));
const validation_1 = require("./validation");
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: "http://localhost:3000"
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/cats", async (request, response) => {
    const planets = await client_1.default.planet.findMany();
    response.json(planets);
});
app.get("/cats/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planet = await client_1.default.planet.findUnique({
        where: { id: planetId }
    });
    if (!planet) {
        response.status(404);
        return next('Cannot GET /cats/' + planetId);
    }
    ;
    response.json(planet);
});
app.post("/cats", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response) => {
    const planetData = request.body;
    const planet = await client_1.default.planet.createMany({
        data: planetData
    });
    response.status(201).json(planet);
});
app.put("/cats/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response, next) => {
    const planetData = request.body;
    const planetId = Number(request.params.id);
    try {
        const planet = await client_1.default.planet.update({
            where: { id: planetId },
            data: planetData
        });
        response.status(200).json(planet);
    }
    catch (error) {
        response.status(404);
        next('Cannot PUT /planets/' + planetId);
    }
});
app.delete("/cats/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    try {
        await client_1.default.planet.delete({
            where: { id: planetId }
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next('Cannot DELETE /planets/' + planetId);
    }
});
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map