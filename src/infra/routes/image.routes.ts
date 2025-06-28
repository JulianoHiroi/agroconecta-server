import { Router } from "express";
import ImageController from "../controllers/images.controler";
import exp from "constants";

const imageRoutes = Router();

const imageController = new ImageController();

imageRoutes.get(
  "/:imageFilename",
  imageController.getImage.bind(imageController)
);


export default imageRoutes;
