import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      throw new Error("Request error");
    }

    let response = await fetch("http://localhost:3000/api/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Request error");
    }

    const payload = await response.json();

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set(
      "studentID",
      JSON.stringify({ studentID: payload.studentID })
    );

    requestHeaders.set("role", JSON.stringify({ role: payload.role }));

    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home/:path*", "/community/:path*"],
};
