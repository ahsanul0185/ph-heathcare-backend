import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
router.put(
  "/:id",
  validateRequest(updateDoctorZodSchema),
  doctorController.getDoctorById,
);
router.put(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateDoctorZodSchema),
  doctorController.updateDoctor,
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  doctorController.deleteDoctor,
);

export const doctorRoutes = router;
