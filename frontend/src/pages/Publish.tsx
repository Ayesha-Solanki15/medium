import { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [formInputs, setFormInputs] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        formInputs,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.msg);
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar authorName="Ayesha" />
      <form
        onSubmit={submitHandler}
        className="w-[60%] flex flex-col gap-4 m-auto"
      >
        <Input
          label="Title"
          placeholder="Enter the Title"
          onChange={(e) => {
            setFormInputs({
              ...formInputs,
              title: e.target.value,
            });
          }}
        />

        <Input
          label="Description"
          placeholder="Enter the Description"
          onChange={(e) => {
            setFormInputs({
              ...formInputs,
              content: e.target.value,
            });
          }}
        />

        <button className="w-full p-2 bg-slate-900 text-white rounded-md mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default Publish;
