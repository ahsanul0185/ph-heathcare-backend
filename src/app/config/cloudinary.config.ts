import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { env } from "./env";
import AppError from "../interfaces/AppError";
import status from "http-status";

cloudinary.config({
  cloud_name: env.CLOUDINARY.CLOUD_NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
});


export const uploadFileToCloudinary = async (buffer : Buffer, fileName : string) : Promise<UploadApiResponse> => {
    if (!buffer || !fileName) {
        throw new AppError(status.BAD_REQUEST, "File buffer and file name are required");
    }


    const extension = fileName.split(".").pop()?.toLocaleLowerCase();

    const fileNameWithoutExtention = fileName
      .split(".")
      .slice(0, -1)
      .join(".")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

      const uniqueName  = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileNameWithoutExtention;

      const folder = extension === "pdf" ? "pdfs" : "images";

      return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({
              resource_type : "auto",
              public_id : uniqueName,
              folder : `ph-healthcare/${folder}`
          },
          (error, result) => {
              if (error) {
                  return reject(new AppError(status.INTERNAL_SERVER_ERROR, "Failed to upload file"));
              } else if (result) {
                  resolve(result as UploadApiResponse);
              }
          }
          ).end(buffer);
      })

}


export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;

    const match = url.match(regex);

    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

      console.log(`File ${publicId} deleted from cloudinary`);
    }
  } catch (error) {
    console.log("Error deleting file from Cloudinary: ", error);
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to delete file");
  }
};

export const cloudinaryUpload = cloudinary;
