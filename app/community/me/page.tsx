
import axios from "axios";
import { cookies } from "next/headers";
import Blog from "../../../components/blog";

const getBlogs = async () => {
  try {
    const token = (await cookies()).get("token");
    let response = await axios.get("http://localhost:3000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const studentID = response.data.studentID;

    response = await axios.get(
      `http://localhost:3000/api/blog/me?studentID=${studentID}`
    );

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
            <div className="flex justify-center text-xl font-bold">
              My Blogs
            </div>
            <Blog
              blogs={blogs}
              mode={Mode.EDIT}
              view_url="/community/me/blog/edit"
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
