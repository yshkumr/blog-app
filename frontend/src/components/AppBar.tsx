import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../utils/config";
import { Avatar } from "./Avatar";
import { capitalizeName } from "../utils/capitalizeName";

export const AppBar = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const getName = async () => {
    const response = await axios.get(`${DATABASE_URL}/user/userinfo`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setName(capitalizeName(response.data.user.name));
  };

  const logoutBtn = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="py-4 border-b">
      <div className="flex md:justify-between md:items-center max-w-[90%] mx-auto flex-col md:flex-row gap-3 md:gap-0">
        <div className="flex justify-center md:flex-none">
          <Link className="font-bold" to="/">
            Blog App
          </Link>
        </div>

        <div className="flex justify-center md:flex-none md:ml-40">
          <Link to="/publish">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Create Blog
            </button>
          </Link>
        </div>

        <div className="cursor-pointer flex items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={name} />
            <span className="font-semibold flex items-center">
              {name || <p className="h-2 bg-gray-200 rounded-full  w-20"></p>}
            </span>
          </div>
          <div className="">
            <button
              className="text-white bg-[#050708] hover:bg-[#050708] font-medium rounded-full text-base px-5 py-2 text-center "
              onClick={logoutBtn}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
