"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createBlogAction, getBlogsAction } from "./action";
import { log } from "node:console";

export default function Community() {
  type Blog = {
    id: number;
    createAt: Date;
    updatedAt: Date;
    published: boolean;
    authorId?: number;
    title: string;
    description: string;
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchingBlog = await getBlogsAction();
        setBlogs(fetchingBlog.blogs);
        console.log(fetchingBlog.blogs);
        console.log(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const createBlog = async () => {
    try {
      await createBlogAction(title, description);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-4">
      <div role="tablist" className="tabs tabs-lifted">
        {/* Blogs page */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Blogs"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div>
            <div className="flex justify-end">
              <label htmlFor="my_modal_6" className="btn btn-accent">
                Create Post
              </label>

              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                  <div className="flex flex-col gap-4">
                    <p className="text-center text-2xl font-bold">
                      Create your post
                    </p>
                    <form
                      className="flex flex-col gap-4"
                      id="createBlogForm"
                      onSubmit={createBlog}
                    >
                      <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                      />
                      <textarea
                        placeholder="Description"
                        className="textarea textarea-bordered textarea-lg w-full"
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      ></textarea>
                    </form>

                    <span className="text-xs text-red-500">
                      <span className="font-bold">Disclaimer: </span> Your post
                      will not be published immediately. It will first be
                      reviewed by an admin for approval. Posts containing
                      inappropriate content may result in disciplinary action.
                    </span>
                  </div>
                  <div className="modal-action">
                    <label htmlFor="my_modal_6" className="btn">
                      Close
                    </label>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      form="createBlogForm"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className="flex flex-col gap-4 mb-4" key={blog.id}>
                  <div className="card card-side bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">{blog.title}</h2>
                      <p>{blog.description}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">View</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </div>
        </div>

        {/* Lost & Found page */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Lost & Found"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div>
            <div className="flex justify-end">
              <button className="btn btn-accent mb-4">
                I Found Something!
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://fastly.picsum.photos/id/655/200/300.jpg?hmac=SlNnemiSlvt724JhX_6o0cfOmLnp5NnDewnA1_vB2rg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Sre</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
