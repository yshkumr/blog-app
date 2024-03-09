import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { AppBar } from "../components/AppBar";
import { BlogContent } from "../components/BlogContent";
import { BlogSkeleton } from "../components/Skeleton";

export const Blog = () => {
  const { id } = useParams();

  const { loading, blog } = useBlog({ id: id || "" });

  return (
    <div className="font-custom">
      <AppBar />
      {loading === true || !blog ? (
        <BlogSkeleton />
      ) : (
        <BlogContent blog={blog} />
      )}
    </div>
  );
};
