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
import * as consultationController from "./controllers/consultation";

import { authMiddleware } from "./middleware/authMiddleware";

import cookieParser from "cookie-parser";

const app = express();

//middleware

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendURL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.post("/clients", authMiddleware, clientController.registerClient);
app.get("/clients", authMiddleware, clientController.getAllClients);
app.get("/clients/:id", authMiddleware, clientController.getClient);
app.delete("/clients/:id", authMiddleware, clientController.deleteClient);
app.put("/clients/:id", authMiddleware, clientController.editClient);

// handlers for diagnos - obsolet - not use
app.post("/diagnos", diagnosController.registerDiagnos);
app.get("/diagnos", diagnosController.getAllDiagnos);
app.get("/diagnos/:id", diagnosController.getDiagnos);
app.delete("/diagnos/:id", diagnosController.deleteDiagnos);
app.put("/diagnos/:id", diagnosController.editDiagnos);

// handlers for treatments
app.post("/treatment", authMiddleware, treatmentController.registerTreatment);
app.get("/treatment", authMiddleware, treatmentController.getAllTreatments);
app.get("/treatment/:id", authMiddleware, treatmentController.getTreatment);
app.delete(
  "/treatment/:id",
  authMiddleware,
  treatmentController.deleteTreatment,
);
app.put("/treatment/:id", authMiddleware, treatmentController.editTreatment);

// handlers for machines
app.post("/machine", authMiddleware, machineController.registerMachine);
app.get("/machine", authMiddleware, machineController.getAllMachines);
app.get("/machine/:id", authMiddleware, machineController.getMachine);
app.delete("/machine/:id", authMiddleware, machineController.deleteMachine);
app.patch("/machine/:id", authMiddleware, machineController.editMachine);

// handlers for journal
app.post("/createJournal", authMiddleware, journalController.createJournal);
app.get(
  "/journals/client/:clientId",
  authMiddleware,
  journalController.getJournalsByClient,
);
app.patch(
  "/journals/:journalId",
  authMiddleware,
  journalController.updateJournal,
);

// handlers for consentForm
app.post(
  "/consentForm",
  authMiddleware,
  consentFormController.createConsentForm,
);
app.get(
  "/consentForm",
  authMiddleware,
  consentFormController.getAllConsentForms,
);

// handlers for medicalHistory
app.post(
  "/medicalHistory",
  authMiddleware,
  medicalHistoryController.createMedicalHistory,
);
app.get(
  "/medicalHistory/latest/:clientId",
  authMiddleware,
  medicalHistoryController.getLatestMedicalHistory,
);
app.get(
  "/medicalHistory/client/:clientId",
  authMiddleware,
  medicalHistoryController.getMedicalHistoriesByClient,
);

//handlers for global journals
app.get("/journals", journalController.getAllJournals);

app.get("/", (req, res) => {
  res.json({ message: "welcome to the app" });
});

//handlers for consultations
app.post(
  "/consultations",
  authMiddleware,
  consultationController.registerConsultation,
);
app.get(
  "/consultations/client/:clientId",
  authMiddleware,
  consultationController.getConsultationsByClient,
);
app.get(
  "/consultations/:consultationId",
  authMiddleware,
  consultationController.getConsultation,
);
app.patch(
  "/consultations/:consultationId",
  authMiddleware,
  consultationController.editConsultation,
);

//MongoDB Connection through .env file to hide the URL
const mongoURL = process.env.DB_URL;

if (!mongoURL) {
  throw new Error("Missing DB_URL environment variable");
}

const port = parseInt(process.env.PORT || "4000");

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(port, () => {
      console.log("Hola Sheila, Server listening on port " + port);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
