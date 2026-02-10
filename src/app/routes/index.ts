import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";
import { userRoutes } from "../module/user/user.route";
import { doctorRoutes } from "../module/doctor/doctor.route";


const router = Router();

router.use("/auth", authRoutes)
router.use("/specialties", specialtyRoutes)
router.use("/users", userRoutes)
router.use("/doctors", doctorRoutes)

export const IndexRoutes = router;