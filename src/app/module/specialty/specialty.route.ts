import { Router } from "express";
import { specialtyController } from "./specialty.controller";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { speacialtyValidation } from "./specialty.validation";

const router = Router();

router.post(
  "/",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(speacialtyValidation.createSpecialtyZodSchema),
  specialtyController.createSpecialty,
);
router.get("/", specialtyController.getAllSpecialties);
router.put(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  specialtyController.updateSpecialty,
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  specialtyController.deleteSpecialty,
);

export const specialtyRoutes = router;
