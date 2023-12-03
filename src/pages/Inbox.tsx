import useSentMailStore from "@/hooks/useSentMailStore";
import ClipLoader from "react-spinners/ClipLoader";

const Inbox = () => {
  const { loading, mails } = useSentMailStore();
  // console.log(mails);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg w-full h-full px-4 md:px-8 py-4 md:py-10">
      Inbox
    </div>
  );
};

export default Inbox;
