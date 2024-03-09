import { useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { DATABASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitBlog = async () => {
    if (!title.trim() || !content.trim()) {
      return alert("Enter both title and content");
    }
    setLoading(true);
    const response = await axios.post(
      `${DATABASE_URL}/blog/createblog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    navigate(`/blog/${response.data.id}`);
  };

  return (
    <div className="font-custom">
      <AppBar />
      <div className="max-w-[80%] md:max-w-[60%] mx-auto mt-10">
        <div className="">
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 text-center"
            placeholder="Enter your blog title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            id="blog-content"
            rows={13}
            className="w-full my-5 rounded-lg p-4 text-lg text-gray-900 bg-gray-50 border border-gray-300 placeholder:text-center resize-none"
            placeholder="Type your blog here"
            required
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            type="button"
            className="text-white bg-[#050708] hover:bg-[#050708] font-medium rounded-lg text-lg px-5 py-3 text-center w-full flex justify-center"
            onClick={submitBlog}
          >
            {loading === true ? <Spinner /> : <span>Submit</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
