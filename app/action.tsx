"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

class CustomErr extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomErr";
  }
}

export async function login(UserName: string, PassWord: string) {
  const prisma = new PrismaClient();
  try {
    // Login with TU api
    let response;
    try {
      response = await axios.post(
        "https://restapi.tu.ac.th/api/v1/auth/Ad/verify",
        {
          UserName,
          PassWord,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Application-Key": process.env.TU_ACCESS_TOKEN,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new CustomErr(
          error.response?.data.Description,
          error.response?.status as number
        );
      } else {
      }

      throw new CustomErr("Internal server error", 500);
    }

    const currentUser = await prisma.user.findUnique({
      where: { studentID: response?.data.username },
    });

    // Create a new user
    if (!currentUser) {
      try {
        await axios.post("http://localhost:3000/api/user", {
          name: response?.data.displayname_en,
          studentID: response?.data.username,
        });
      } catch (error) {
        // Fail to create user -> server error
        throw new CustomErr("Internal server error", 500);
      }
    }

    // Sign jwt token
    const token = jwt.sign(
      { studentID: response?.data.username, role: currentUser?.role },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    // Save token in cookie
    (await cookies()).set("token", token);
  } catch (error) {
    if (error instanceof CustomErr) {
      return { message: error.message, status: error.statusCode };
    } else {
      return { message: "Internal server error", status: 500 };
    }
  }
  return redirect("/home");
}

export async function logoutAction() {
  (await cookies()).delete("token");
  return redirect("/");
}
