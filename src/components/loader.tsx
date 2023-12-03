import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ClipLoader size={50} />
    </div>
  );
};

export default Loader;
