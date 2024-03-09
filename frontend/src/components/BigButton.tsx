type Label = {
  label: string;
  onClick: () => void;
};

export const BigButton = ({ label, onClick }: Label) => {
  return (
    <button
      type="button"
      className="text-white bg-[#050708] hover:bg-[#050708] font-medium rounded-lg text-lg px-5 py-3 text-center items-center lg:w-[420px] w-[300px]"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
