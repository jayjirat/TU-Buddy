"use client";
import { useState } from "react";
import { login } from "./action.tsx";

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(email, password);
  }

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
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
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
                value={password}
                onChange={(event) => {setPassword(event.target.value)}}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
