import { Link } from "react-router-dom";

type HeadingComponent = {
  heading: string;
  subHeading: string;
  link: string;
};

export const Heading = ({ heading, subHeading, link }: HeadingComponent) => {
  return (
    <div className="mb-5">
      <h1 className="text-4xl font-bold mb-2">{heading}</h1>
      <div className="flex gap-1 justify-center">
        <p className="font-medium text-gray-500">{subHeading}</p>
        <Link
          className="underline text-gray-500 font-semibold"
          to={link === "Sign In" ? "/signin" : "/signup"}
        >
          {link}
        </Link>
      </div>
    </div>
  );
};
