export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center size-10 overflow-hidden bg-gray-600 rounded-full">
      <span className="font-medium text-white">
        {name[0]?.toUpperCase() || "U"}
      </span>
    </div>
  );
};
