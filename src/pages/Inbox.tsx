import Loader from "@/components/loader";
import MailItem from "@/components/mail-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useReceivedMailStore from "@/hooks/useReceivedMailStore";

const Inbox = () => {
  const { loading, mails } = useReceivedMailStore();

  if (loading) {
    return <Loader style="h-full" />;
  }

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 md:pt-4 flex flex-col gap-4">
      {!loading && mails?.length > 0 ? (
        <>
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
            <p className="text-gray-600 text-md">
              {mails?.length === 1 ? "1 mail" : `${mails?.length} mails`}
            </p>
          </div>
          <div className="overflow-y-auto p-1">
            {mails?.map((mail, index) => (
              <MailItem
                id={mail.id}
                sender={mail.sender}
                date={mail.date}
                subject={mail.subject}
                body={mail.body}
                isRead={mail.isRead}
                isLast={index === mails.length - 1}
                key={mail.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="text-2xl tracking-wide text-gray-600">
            Your inbox is Empty!
          </h3>
        </div>
      )}
    </div>
  );
};

export default Inbox;
