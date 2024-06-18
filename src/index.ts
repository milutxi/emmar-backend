import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as clientController from "./controllers/clients";
import * as diagnosController from "./controllers/diagnos";

const app = express();

//middleware

app.use(cors());
app.use(express.json());

//handlers for clients
app.post("/clients", clientController.registerClient);
app.get("/clients", clientController.getAllClients);
app.get("/clients/:id", clientController.getClient);
app.delete("/clients/:id", clientController.deleteClient);
app.patch("/clients/:id", clientController.editClient);

// handlers for diagnos
app.post("/diagnos", diagnosController.registerDiagnos);
app.get("/diagnos", diagnosController.getAllDiagnos);
app.get("/diagnos/:id", diagnosController.getDiagnos);
app.delete("/diagnos/:id", diagnosController.deleteDiagnos);
app.patch("/diagnos/:id", diagnosController.editDiagnos);



app.get("/", (req, res) => {
  res.json({ message: "welcome to the app" });
});

//MongoDB Connection through .env file to hide the URL
const mongoURL = process.env.DB_URL;

if (!mongoURL) throw Error("Missing db url");

mongoose.connect(mongoURL).then(() => {
  const port = parseInt(process.env.PORT || "4000");
  app.listen(port, () => {
    console.log("Hola Sheila, Server listening on port " + port);
  });
});
