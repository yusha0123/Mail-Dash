import { ReceivedMail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { format } from "date-fns";

const MailItem = ({
  id,
  sender,
  subject,
  body,
  isRead,
  date,
  isLast,
}: ReceivedMail & { isLast?: boolean }) => {
  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  const formattedDate = format(
    new Date(date.seconds * 1000),
    "MMM dd yyyy 'at' hh:mm a"
  );

  return (
    <div
      className={cn(
        "flex py-1 cursor-pointer mail-item border-t",
        isLast && "border-b"
      )}
    >
      <div className="w-8 h-full">
        {isRead ? (
          <div className="w-9 h-9" />
        ) : (
          <Dot className="text-blue-500 w-9 h-9" />
        )}
      </div>
      <div
        className={cn(
          "w-full flex items-center text-sm",
          !isRead && "font-semibold"
        )}
      >
        <h3 className="w-1/4 hide-extra-text">{sender}</h3>
        <div className="w-3/4 flex items-center gap-2 flex-1">
          <p className="max-w-[75%] hide-extra-text">{subject}</p>
          {" - "}
          <p
            dangerouslySetInnerHTML={createMarkup(body)}
            className="hide-extra-text"
          />
        </div>
        <p className="px-4">{formattedDate}</p>
      </div>
    </div>
  );
};

export default MailItem;
