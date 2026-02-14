
import express, { Application, NextFunction, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/noFound";
import cookieParser from "cookie-parser";
import { auth } from "./app/lib/auth";
import path from "path";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { env } from "./app/config/env";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(cors({
  origin : [env.FRONTEND_URL, env.BETTER_AUTH_URL ],
  credentials : true,
  methods : ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders : ["Content-Type", "Authorization"],
}));

app.use("/api/auth", toNodeHandler(auth))

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", IndexRoutes)

// Basic route
app.get('/', async (req: Request, res: Response) => {

  const specialty = await prisma.specialty.create({
    data: {
      title: "Cardiology"
    }
  })

  res.status(201).json({
    success: true,
    message : "API is working",
    data : specialty
  })
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;