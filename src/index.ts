import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as clientController from "./controllers/clients";
import * as diagnosController from "./controllers/diagnos";
import * as treatmentController from "./controllers/treatments";
import * as machineController from "./controllers/machines";
import * as consentFormController from "./controllers/consentForm";
import * as medicalHistoryController from "./controllers/medicalHistory";
import * as journalController from "./controllers/journal";
import * as authController from "./controllers/auth";

import cookieParser from "cookie-parser";

const app = express();

//middleware

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendURL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json());

//hanglers for auth
app.post("/auth/register", authController.registerUser);
app.post("/auth/login", authController.loginUser);
app.post("/auth/logout", authController.logoutUser);
app.get("/auth/me", authController.getMe);

//handlers for clients
app.post("/clients", clientController.registerClient);
app.get("/clients", clientController.getAllClients);
app.get("/clients/:id", clientController.getClient);
app.delete("/clients/:id", clientController.deleteClient);
app.put("/clients/:id", clientController.editClient);

// handlers for diagnos - obsolet - not use
app.post("/diagnos", diagnosController.registerDiagnos);
app.get("/diagnos", diagnosController.getAllDiagnos);
app.get("/diagnos/:id", diagnosController.getDiagnos);
app.delete("/diagnos/:id", diagnosController.deleteDiagnos);
app.put("/diagnos/:id", diagnosController.editDiagnos);

// handlers for treatments
app.post("/treatment", treatmentController.registerTreatment);
app.get("/treatment", treatmentController.getAllTreatments);
app.get("/treatment/:id", treatmentController.getTreatment);
app.delete("/treatment/:id", treatmentController.deleteTreatment);
app.put("/treatment/:id", treatmentController.editTreatment);

// handlers for machines
app.post("/machine", machineController.registerMachine);
app.get("/machine", machineController.getAllMachines);
app.get("/machine/:id", machineController.getMachine);
app.delete("/machine/:id", machineController.deleteMachine);
app.patch("/machine/:id", machineController.editMachine);

// handlers for journal
app.post("/createJournal", journalController.createJournal);
app.get("/journals/client/:clientId", journalController.getJournalsByClient);
app.patch("/journals/:journalId", journalController.updateJournal);

// handlers for consentForm
app.post("/consentForm", consentFormController.createConsentForm);
app.get("/consentForm", consentFormController.getAllConsentForms);

// handlers for medicalHistory
app.post("/medicalHistory", medicalHistoryController.createMedicalHistory);
app.get("/medicalHistory/latest/:clientId", medicalHistoryController.getLatestMedicalHistory);
app.get("/medicalHistory/client/:clientId", 
  medicalHistoryController.getMedicalHistoriesByClient,
);

//handlers for global journals
app.get("/journals", journalController.getAllJournals);




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
