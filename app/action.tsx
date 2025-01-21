"use server";

import axios from "axios";
import { redirect } from "next/navigation";

export async function login(email:string, password:string) {
  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/home");
}
