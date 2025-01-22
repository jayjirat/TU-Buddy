"use client";
import { useState } from "react";
import { login } from "./action.tsx";

export default function Home() {
  const [UserName, setUserName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { message, status } = await login(UserName, PassWord);
    setErrorMessage(message);
    setStatus(status);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        {/* header */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">TU BUDDY</h1>
          <p className="py-6">
            TU Buddy – Your go-to platform for Thammasat University students to
            connect, share, and explore!
          </p>
        </div>

        {/* login form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">StudentID/Username</span>
              </label>
              <input
                name="studentID"
                type="text"
                placeholder="studentID/Username"
                value={UserName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={PassWord}
                onChange={(event) => {
                  setPassWord(event.target.value);
                }}
                className="input input-bordered"
                required
              />
              <br />
              {errorMessage && (
                <span className="text-xs text-red-500">
                  <span className="font-bold">เกิดข้อผิดพลาด: </span>
                  {errorMessage}
                </span>
              )}
              <br />
              {status !== 0 && (
                <span className="text-xs text-red-500">
                  <span className="font-bold">Exit with status code: </span>{" "}
                  {status}
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
