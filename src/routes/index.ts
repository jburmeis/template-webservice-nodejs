import express from "express";
import { rootRoutes } from "./root";
import { demoRoutes } from "./demo";
import { ApplicationServices } from "../services/ApplicationServices";

export const setupRoutes = (
  app: express.Application,
  appServices: ApplicationServices
) => {
  app.use("/api/", rootRoutes);
  // Example for a set of routes which use global application services
  app.use("/api/demo", demoRoutes(appServices));
};
