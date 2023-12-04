import MailItem from "@/components/mail-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useReceivedMailStore from "@/hooks/useReceivedMailStore";
import ClipLoader from "react-spinners/ClipLoader";

const Inbox = () => {
  const { loading, mails } = useReceivedMailStore();
  console.log(mails);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 md:pt-4 flex flex-col gap-4">
      <div className="flex h-10 item-center justify-between px-4 md:px-6 items-center mt-3 md:mt-0">
        <Select>
          <SelectTrigger className="w-[8rem]">
            <SelectValue placeholder="Sort mails" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-gray-600">{mails?.length} mails</p>
      </div>
      <div className="py-1 overflow-y-auto">
        {mails?.map((mail, index) => (
          <MailItem
            id={mail.id}
            sender={mail.sender}
            date={mail.date}
            subject={mail.subject}
            body={mail.body}
            isRead={mail.isRead}
            key={mail.id}
            isLast={index === mails.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Inbox;
