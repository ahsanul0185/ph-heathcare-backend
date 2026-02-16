import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { scheduleController } from "./schedule.controller";


const router = Router();


router.post("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), scheduleController.createSchedule);
router.get("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), scheduleController.getAllSchedules);
router.get("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), scheduleController.getScheduleById);
router.put("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), scheduleController.updateSchedule);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), scheduleController.deleteSchedule);

export const scheduleRoutes = router;