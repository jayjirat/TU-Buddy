"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createBlogAction, getDataAction } from "../../action";
import { useRouter } from "next/router";

export default function Community() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentID, setStudentID] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchingUser = await getDataAction();
        setStudentID(fetchingUser?.studentID.studentID);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchUser();
  }, []);

  const createBlog = async () => {
    try {
      await createBlogAction(title, description, studentID);
      setTitle("");
      setDescription("");
      console.log("Blog created");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center p-6 ">
      <form
        className=" shadow-xl rounded-lg p-8 w-full max-w-2xl h-96"
        onSubmit={createBlog}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Blog Post
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered textarea-lg w-full"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <Link href={"/community"} className="btn">
            Back
          </Link>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={title === "" || description === ""}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
