import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, studentID } = await request.json();

    await prisma.user.create({
      data: {
        name,
        studentID,
      },
    });

    return Response.json(
      {},
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(
      {
        users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
