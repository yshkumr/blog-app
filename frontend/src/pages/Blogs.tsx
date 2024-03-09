import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div className=" font-custom">
      <AppBar />
      {loading === true ? (
        <div className="">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      ) : (
        <div className="max-w-[90%] mx-auto my-5 flex flex-col items-center">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name}
              publishedDate={blog.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};
