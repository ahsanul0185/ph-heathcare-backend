import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import ms, { StringValue } from "ms";
import { env } from "../../config/env";
import AppError from "../../interfaces/AppError";
import { cookieUtls } from "../../utils/cookie";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const maxAge = ms(env.ACCESS_TOKEN_EXPIRES_IN as StringValue);
  console.log(maxAge);

  console.log(env.ACCESS_TOKEN_EXPIRES_IN);

  const payload = req.body;

  const result = await authService.registerPatient(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.loginUser(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;

  const result = await authService.getMe(user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});


const getNewToken = catchAsync(async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];

    if (!refreshToken) {
      throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
    }

    const result = await authService.getNewToken(refreshToken, betterAuthSessionToken);

    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message : "New tokens generated successfully",
      data : result
    });

});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];

  const result = await authService.changePassword(payload, betterAuthSessionToken);

  const {accessToken, refreshToken, token} = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await authService.logoutUser(betterAuthSessionToken);

  cookieUtls.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  cookieUtls.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  cookieUtls.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
  })
});

export const authController = {
  registerPatient,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logoutUser
};
