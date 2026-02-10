import { Router } from "express";
import { specialtyController } from "./specialty.controller";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";


const router = Router();

router.post("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.createSpecialty);
router.get("/", specialtyController.getAllSpecialties);
router.put("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.updateSpecialty);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.deleteSpecialty);


export const specialtyRoutes = router;