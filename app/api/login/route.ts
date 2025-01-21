import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// mock login on production use tu api
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const loginUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (password !== loginUser?.password) {
      return Response.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        message: "Logged in successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
