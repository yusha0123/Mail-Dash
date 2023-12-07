import Loader from "@/components/loader";
import ReceivedMail from "@/components/received-mail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useReceivedMailStore from "@/hooks/useReceivedMailStore";
import { useState } from "react";

const Inbox = () => {
  const { loading, mails } = useReceivedMailStore();
  const [filterType, setFilterType] = useState("all");

  if (loading) {
    return <Loader style="h-full" />;
  }

  const filteredMails = mails?.filter((mail) => {
    if (filterType === "read") {
      return mail.isRead === true;
    } else if (filterType === "unread") {
      return mail.isRead === false;
    } else {
      return true;
    }
  });

  let message = "";
  if (filterType === "all") {
    message = "Your inbox is empty!";
  } else if (filterType === "read") {
    message = "No read mails found!";
  } else if (filterType === "unread") {
    message = "No unread mails found!";
  }

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 md:pt-4 flex flex-col gap-4">
      <div className="flex h-10 item-center justify-between px-4 md:px-6 items-center mt-3 md:mt-0">
        <Select
          onValueChange={(value) => setFilterType(value)}
          value={filterType}
          disabled={mails?.length === 0}
        >
          <SelectTrigger className="w-[8rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-gray-600 text-md">
          {filteredMails?.length === 1
            ? "1 mail"
            : `${filteredMails?.length} mails`}
        </p>
      </div>
      {!loading && filteredMails?.length > 0 ? (
        <>
          <div className="overflow-y-auto p-1">
            {filteredMails?.map((mail, index) => (
              <ReceivedMail
                id={mail.id}
                sender={mail.sender}
                date={mail.date}
                subject={mail.subject}
                body={mail.body}
                isRead={mail.isRead}
                isLast={index === filteredMails.length - 1}
                key={mail.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="text-2xl tracking-wide text-gray-600">{message}</h3>
        </div>
      )}
    </div>
  );
};

export default Inbox;
