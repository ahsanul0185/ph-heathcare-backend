import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";
import status from "http-status";


const getAllDoctors = catchAsync(
    async (req : Request, res : Response) => {

        const result = await doctorService.getAllDoctors();

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Doctors fetched successfully",
            data : result
        })
    }
)

const getDoctorById = catchAsync(
    async (req : Request, res : Response) => {

        const id = req.params.id;

        const result = await doctorService.getDoctorById(id as string);

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Doctor data fetched successfully",
            data : result
        })
    }
)

export const doctorController = {
    getAllDoctors,
    getDoctorById
}