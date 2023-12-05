import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ style }: { style: "h-screen" | "h-full" }) => {
  return (
    <div className={`${style} w-full flex items-center justify-center`}>
      <ClipLoader size={50} />
    </div>
  );
};

export default Loader;
