import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// mock login on production use tu api
export async function POST(request: Request) {
  try {
    const { title, description, studentID } = await request.json();
    console.log(studentID);

    const newBlog = await prisma.blog.create({
      data: { title, description, authorId: studentID },
    });
    return Response.json(
      {
        message: "Blog created successfully",
        blog: newBlog,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json({ error: error });
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
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
