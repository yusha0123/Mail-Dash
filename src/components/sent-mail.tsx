import { SentMail as Sent_Mail } from "@/lib/types";
import { cn, createMarkup, formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

const SentMail = ({
  id,
  receiver,
  subject,
  body,
  date,
  isLast,
}: Sent_Mail & { isLast?: boolean }) => {
  return (
    <Link
      to={`/sent/${id}`}
      className={cn(
        "flex mail-item transition duration-300 ease-in-out px-3 py-2 border-t",
        isLast && "border-b"
      )}
    >
      <div className="w-full flex flex-col md:flex-row items-start md:items-center text-sm">
        <div className="w-full md:w-1/4 flex justify-between md:inline">
          <h3 className="hide-extra-text">To: {receiver}</h3>
          <p className="md:hidden mr-2">{formatDate({ date })}</p>
        </div>
        <div className="w-3/4 flex md:flex-row flex-col items-start md:items-center md:gap-2 flex-1">
          <p className="w-full md:w-fit md:max-w-[75%] hide-extra-text">
            {subject}
          </p>
          <span className="md:inline hidden">{" - "}</span>
          <p
            dangerouslySetInnerHTML={createMarkup(body)}
            className="hide-extra-text font-normal"
          />
        </div>
        <p className="px-4 hidden md:block">{formatDate({ date })}</p>
      </div>
    </Link>
  );
};

export default SentMail;
