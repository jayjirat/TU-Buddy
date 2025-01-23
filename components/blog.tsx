import Link from "next/link";

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

type BlogProps = {
  blogs: Blog[];
  mode: Mode;
  view_url: string;
};

export default function Blog({ blogs, mode, view_url }: BlogProps) {
  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <div className="flex flex-col gap-4 mb-4" key={blog.id}>
            <div className="card card-side bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.description}</p>
                <div className="card-actions justify-end">
                  <Link
                    href={`${view_url}?blogID=${blog.id}`}
                    className="btn btn-primary"
                  >
                    {mode}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
