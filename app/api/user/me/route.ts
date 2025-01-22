import jwt from "jsonwebtoken";

export function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const payload = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );
    return Response.json(payload);
  } catch (error) {
    return Response.json(error, { status: 401 });
  }
}
