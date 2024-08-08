import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useState } from "react";
import { SignupInput } from "@aishasolanki/medium-zod-common";
import axios from "axios";
import { BACKEND_URL } from "../../config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Auth = ({ type }: { type: "Signup" | "Login" }) => {
  const [authInputs, setAuthInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const endpoint = type === "Signup" ? "signup" : "signin";
    const body =
      type === "Signup"
        ? authInputs
        : { email: authInputs.email, password: authInputs.password };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${endpoint}`,
        body
      );
      //btw zod ignores the extra input field so just passing authInputs as a body is fine.

      //todo:  make sure to return the jwt from the signup backend route
      const jwt = response.data.jwt;
      localStorage.setItem("token", "Bearer " + jwt);
      navigate("/blog/1");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-12">
      <div className="flex flex-col gap-2 ">
        <div className="text-3xl font-extrabold">
          {type === "Signup" ? "Create an account" : "Login to the account"}
        </div>
        <p className="text-slate-400">
          {type === "Signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <Link
            to={type === "Signup" ? "/login" : "/signup"}
            className="text-slate-500 underline"
          >
            {type === "Signup" ? "Login" : "Sign up"}
          </Link>
        </p>
      </div>
      <form onSubmit={submitHandler} className="w-[60%] flex flex-col gap-4">
        {type === "Signup" && (
          <Input
            label="Name"
            placeholder="Enter your name"
            onChange={(e) => {
              setAuthInputs({
                ...authInputs,
                name: e.target.value,
              });
            }}
          />
        )}
        <Input
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => {
            setAuthInputs({
              ...authInputs,
              email: e.target.value,
            });
          }}
          type="email"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => {
            setAuthInputs({
              ...authInputs,
              password: e.target.value,
            });
          }}
          type="password"
        />
        <button className="w-full p-2 bg-slate-900 text-white rounded-md mt-2">
          {type}
        </button>
      </form>
    </div>
  );
};

export default Auth;
