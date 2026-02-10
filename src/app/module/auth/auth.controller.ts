import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync"
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import ms, { StringValue } from "ms";
import { env } from "../../../config/env";


const registerPatient = catchAsync(
    async (req : Request, res : Response) =>{

        const maxAge = ms(env.ACCESS_TOKEN_EXPIRES_IN as StringValue);
        console.log(maxAge)

        console.log(env.ACCESS_TOKEN_EXPIRES_IN)

        const payload = req.body;

        const result = await authService.registerPatient(payload);

        const {accessToken, refreshToken, token, ...rest} = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token as string);


        sendResponse(res, {
            httpStatusCode : status.CREATED,
            success : true,
            message : "Patient registered successfully",
            data : {
                token, 
                accessToken,
                refreshToken,
                ...rest
            }
        })
    }
) 
const loginUser = catchAsync(
    async (req : Request, res : Response) =>{
        const payload = req.body;

        const result = await authService.loginUser(payload);

        const {accessToken, refreshToken, token, ...rest} = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token);

        sendResponse(res, {
            httpStatusCode : status.OK,
            success : true,
            message : "User logged in successfully",
            data : {
                token, 
                accessToken,
                refreshToken,
                ...rest
            }
        })
    }
)

export const authController = {
    registerPatient,
    loginUser
}