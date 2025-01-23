"use server";
import Link from "next/link";
import axios from "axios";
import Blog from "../../components/blog";

const getBlogs = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/blog`);

    return response.data.blogs;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Community() {
  type Blog = {
    id: number;
    createAt: Date;
    updatedAt: Date;
    published: boolean;
    authorId: number;
    title: string;
    description: string;
  };

  enum Mode {
    VIEW = "View",
    EDIT = "Edit",
  }

  const blogs: Blog[] = await getBlogs();

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
              <Link href={"/community/blog/create"} className="btn btn-accent">
                Create post
              </Link>
            </div>
            <Blog
              blogs={blogs}
              mode={Mode.VIEW}
              view_url="/community/blog/view"
            />
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
