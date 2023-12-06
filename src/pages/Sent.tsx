import Loader from "@/components/loader";
import SentMail from "@/components/sent-mail";
import useSentMailStore from "@/hooks/useSentMailStore";
import { Link } from "react-router-dom";

const Sent = () => {
  const { loading, mails } = useSentMailStore();

  if (loading) {
    return <Loader style="h-full" />;
  }

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 md:pt-4 flex flex-col gap-4">
      {!loading && mails?.length > 0 ? (
        <>
          <div className="h-10 flex items-center justify-end px-4 md:px-6 lg:px-8">
            <p className="text-gray-600 text-md">
              {mails?.length === 1
                ? "1 sent mail"
                : `${mails?.length} sent mails`}
            </p>
          </div>
          <div className="overflow-y-auto p-1">
            {mails?.map((mail, index) => (
              <SentMail
                id={mail.id}
                receiver={mail.receiver}
                date={mail.date}
                subject={mail.subject}
                body={mail.body}
                isLast={index === mails.length - 1}
                key={mail.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
          <h3 className="text-2xl tracking-wide text-gray-600">
            No sent Messages!
          </h3>
          <p>
            <Link
              to={"/compose"}
              className="border-b border-blue-400 text-blue-400"
            >
              Send
            </Link>{" "}
            one now!
          </p>
        </div>
      )}
    </div>
  );
};

export default Sent;
