import { useState } from "react";
import { Heading } from "../components/Heading";
import { Quote } from "../components/Quote";
import { SignInInput } from "@player9/common-blog";
import { useNavigate } from "react-router-dom";
import { LabelledInput } from "../components/LabelledInput";
import { BigButton } from "../components/BigButton";
import axios, { AxiosError } from "axios";
import { DATABASE_URL } from "../utils/config";
import { Spinner } from "../components/Spinner";

export const SignIn = () => {
  const [userDetails, setUserDetails] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signInBtn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${DATABASE_URL}/user/signin`,
        userDetails
      );

      const { jwt } = response.data;

      localStorage.setItem("token", "Bearer " + jwt);

      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 411) {
          alert("Invalid Inputs");
        } else if (error.response?.status === 400) {
          alert("Incorrect email or password");
        } else {
          alert("Error while signing in");
        }
      }
      console.log(error);
    }
  };

  return (
    <div className="font-custom flex justify-center lg:flex-none max-w-[90%] lg:max-w-[100%]  mx-auto lg:grid lg:grid-cols-2 h-screen">
      <Quote />
      <div className="flex gap-7 justify-center flex-col items-center">
        <Heading
          heading="Sign into your account"
          subHeading="Don't have an account?"
          link="Sign Up"
        />
        <LabelledInput
          label="Email"
          placeholder="johndoe@gmail.com"
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              email: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Password"
          type="password"
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              password: e.target.value,
            });
          }}
        />
        {loading === true ? (
          <button
            type="button"
            className="text-white bg-[#050708] hover:bg-[#050708] font-medium rounded-lg text-lg px-5 py-3 text-center items-center lg:w-[420px] w-[300px] flex justify-center"
          >
            <Spinner />
          </button>
        ) : (
          <BigButton label="Sign In" onClick={signInBtn} />
        )}
      </div>
    </div>
  );
};
