import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";


const router = Router();

router.use("/auth", authRoutes)
router.use("/specialties", specialtyRoutes)

export const IndexRoutes = router;