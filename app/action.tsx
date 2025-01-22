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
    const response = await axios.post(
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

    if (response.status === 200) {
      console.log("login success");
      const currentUser = await prisma.user.findUnique({
        where: { studentID: response.data.username },
      });

      // Create a new user
      if (!currentUser) {
        console.log("no user found");
        try {
          await axios.post("http://localhost:3000/api/user", {
            name: response.data.displayname_en,
            studentID: response.data.username,
          });
          console.log("created user");
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error();
          }
        }
      }

      // Sign jwt token
      const token = jwt.sign(
        { studentID: response.data.username },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1h",
        }
      );
      console.log("created token");

      // Save token in cookie
      (await cookies()).set("token", token);
    } else if (response.status === 400) {
      throw new CustomErr(response.data.Description, response.status);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    if (error instanceof CustomErr) {
      return Response.json(
        {
          message: error.message,
        },
        { status: error.statusCode }
      );
    } else {
      return Response.json(
        {
          message: "Internal server error",
        },
        { status: 500 }
      );
    }
  }
  return redirect("/home");
}
