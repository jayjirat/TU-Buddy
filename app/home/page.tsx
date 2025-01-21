import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full justify-between py-10 gap-8">
        <div className="mx-auto container flex justify-center px-4">
          <div className="card bg-base-100 w-auto shadow-xl max-w-lg md:max-w-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Marketplace</h2>
              <p>
                Buy and sell second-hand items, find dorm contracts, and
                discover student-run eateries.
              </p>

              <div className="card-actions justify-end">
                <Link href={"/"} className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container flex justify-center px-4">
          <div className="card bg-base-100 w-auto shadow-xl max-w-lg md:max-w-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Review</h2>
              <p>Read reviews for campus restaurants and courses around you.</p>
              <div className="card-actions justify-end">
                <Link href={"/"} className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container flex justify-center px-4">
          <div className="card bg-base-100 w-auto shadow-xl max-w-lg md:max-w-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Community</h2>
              <p>Find lost items and explore community blogs.</p>
              <div className="card-actions justify-end">
                <Link href={"/community"} className="btn btn-primary">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
