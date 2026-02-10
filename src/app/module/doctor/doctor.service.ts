import status from "http-status";
import AppError from "../../interfaces/AppError";
import { prisma } from "../../lib/prisma";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include : {
            user : true,
            specialties : {
                include : {
                    specialty : true
                }
            }
        }
    });
    return doctors;
}

const getDoctorById = async (id : string) => {
    const doctor = await prisma.doctor.findUnique({
        where : {
            id
        },
        include : {
            user : true,
            specialties : {
                include : {
                    specialty : true
                }
            }
        }
    })

    if (!doctor) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    return doctor
}

export const doctorService = {
    getAllDoctors,
    getDoctorById
}