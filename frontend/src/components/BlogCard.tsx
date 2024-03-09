import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { capitalizeName } from "../utils/capitalizeName";

type BlogCardType = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  publishedDate: string;
};

export const BlogCard = ({
  id,
  title,
  content,
  authorName,
  publishedDate,
}: BlogCardType) => {
  return (
    <Link className="w-[80%] md:w-[50%] border-b py-7" to={`/blog/${id}`}>
      <div className="flex items-center gap-2 mb-4">
        <Avatar name={authorName} />
        <p className="font-medium">{capitalizeName(authorName)}</p>
        <p className=" font-medium text-gray-500">
          {"· " + new Date(publishedDate).toDateString().slice(3, 15)}
        </p>
      </div>
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="mt-2 font-medium">{content.slice(0, 150) + "....."}</p>
      </div>
      <div className="mt-5 font-medium text-gray-500">
        <p>{Math.ceil(content.split(" ").length / 100) + " min read"}</p>
      </div>
    </Link>
  );
};
