import { Blog } from "../hooks";
import { capitalizeName } from "../utils/capitalizeName";
import { Avatar } from "./Avatar";

export const BlogContent = ({ blog }: { blog: Blog }) => {
  return (
    <div className="max-w-[80%] md:max-w-[50%] mx-auto mt-10 w-screen flex items-center flex-col mb-10">
      <div>
        <h1 className="text-3xl md:text-4xl text-center font-bold mb-8">
          {blog.title}
        </h1>
        <div className="flex justify-between md:justify-center gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={blog.author.name} />
            <p className="font-medium text-gray-600">·</p>
            <div className="">
              <p className="font-medium">{capitalizeName(blog.author.name)}</p>
              <p className="font-medium text-sm text-gray-600">
                {Math.ceil(blog.content.split(" ").length / 100) + " min read"}
              </p>
            </div>
            <p className="font-medium  text-gray-600">·</p>
          </div>
          <div>
            <p className="font-medium text-gray-600 mt-3">
              {new Date(blog.createdAt).toDateString().slice(3, 15)}
            </p>
          </div>
        </div>
      </div>

      <div className="content mt-8">
        <p className="text-lg">{blog.content}</p>
      </div>
    </div>
  );
};
