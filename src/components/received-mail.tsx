import { ReceivedMail as Received_Mail } from "@/lib/types";
import { cn, createMarkup, formatDate } from "@/lib/utils";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

const ReceivedMail = ({
  id,
  sender,
  subject,
  body,
  isRead,
  date,
  isLast,
}: Received_Mail & { isLast?: boolean }) => {
  return (
    <Link
      to={`/inbox/${id}`}
      className={cn(
        "flex mail-item border-t transition duration-300 ease-in-out py-1 md:py-0",
        isLast && "border-b"
      )}
    >
      <div className="h-full">
        {isRead ? (
          <span className="w-10 h-10 block" />
        ) : (
          <Dot className="text-blue-600 w-10 h-10" />
        )}
      </div>
      <div
        className={cn(
          "w-full flex flex-col md:flex-row items-start md:items-center text-sm",
          !isRead && "font-semibold"
        )}
      >
        <div className="w-full md:w-1/4 flex justify-between md:inline">
          <h3 className="hide-extra-text">{sender}</h3>
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

export default ReceivedMail;
