import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const studentID = url.searchParams.get("studentID");

    const blogs = await prisma.blog.findMany({
      where: { authorId: studentID as string },
    });
    return Response.json(
      {
        blogs,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json({ error: error });
  }
}
