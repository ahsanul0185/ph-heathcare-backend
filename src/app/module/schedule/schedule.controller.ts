import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { scheduleService } from "./schedule.service";
import { IQueryParams } from "../../interfaces/query.interface";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await scheduleService.createSchedule(payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await scheduleService.getAllSchedules(query as IQueryParams);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Schedules retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedule = await scheduleService.getScheduleById(id as string);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Schedule retrieved successfully",
    data: schedule,
  });
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedSchedule = await scheduleService.updateSchedule(
    id as string,
    payload,
  );
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Schedule updated successfully",
    data: updatedSchedule,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await scheduleService.deleteSchedule(id as string);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Schedule deleted successfully",
  });
});

export const scheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
