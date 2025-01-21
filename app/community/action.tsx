"use server";

import axios from "axios";

export async function createBlogAction(title: string, description: string) {
  try {
    const response = await axios.post("http://localhost:3000/api/blog", {
      title,
      description,
    });

    if (response.status !== 201) {
      throw new Error("Error creating blog");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getBlogsAction() {
  try {
    const response = await axios.get("http://localhost:3000/api/blog");

    if (response.status !== 200) {
      throw new Error("Error fetching blog");
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
