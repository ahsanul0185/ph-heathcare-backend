import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { scheduleService } from "./schedule.service";


const createSchedule = catchAsync(
    async (req : Request, res : Response) => {

        const result = await scheduleService.createSchedule();

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Schedule created successfully",
            data : result,
        })
    }
)

const getAllSchedules = catchAsync(
    async (req : Request, res : Response) => {

        const result = await scheduleService.getAllSchedules();

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Schedules fetched successfully",
            data : result,
        })
    }
)


const getScheduleById = catchAsync(
    async (req : Request, res : Response) => {

        const result = await scheduleService.getScheduleById();

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Schedule fetched successfully",
            data : result,
        })
    }
)


const updateSchedule = catchAsync(
    async (req : Request, res : Response) => {

        const id = req.params.id;
        const payload = req.body;

        const result = await scheduleService.updateSchedule(); 

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Schedule updated successfully",
            data : result
        })
    }
)

const deleteSchedule = catchAsync(
    async (req : Request, res : Response) => {

        const id = req.params.id;

        const result = await scheduleService.deleteSchedule();

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "Schedule deleted successfully",
            data : result
        })
    }
)


export const scheduleController = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
}