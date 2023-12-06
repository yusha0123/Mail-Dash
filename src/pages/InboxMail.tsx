import Loader from "@/components/loader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useReceivedMailStore from "@/hooks/useReceivedMailStore";
import { auth, firestore } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { createMarkup } from "@/lib/utils";
import useOverlayStore from "@/hooks/useOverlayStore";

const InboxMail = () => {
  const { id } = useParams();
  const { loading, mails } = useReceivedMailStore();
  const { onOpen } = useOverlayStore();

  if (loading) {
    return <Loader style="h-full" />;
  }

  const currentMail = mails?.find((mail) => mail.id === id);

  if (!currentMail) {
    return <Navigate to="/inbox" replace />;
  }

  (async () => {
    if (!currentMail || currentMail.isRead) return;
    const docRef = doc(
      firestore,
      "mails",
      auth.currentUser?.email!,
      "received",
      id!
    );
    try {
      await updateDoc(docRef, {
        isRead: true,
      });
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  })();

  let formattedDate = "";
  if ("seconds" in currentMail.date) {
    const dateInSeconds = currentMail.date.seconds;
    const date = new Date(dateInSeconds * 1000);
    formattedDate = format(date, "dd MMM yyyy 'at' h:mm a");
  }

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 pt-3 flex flex-col gap-3">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/inbox"}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Back to Inbox</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon"}
                disabled={!currentMail}
                onClick={() =>
                  onOpen("deleteModal", {
                    mailType: "received",
                    id: currentMail?.id,
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator />
      <div className="px-4 md:px-8 lg:px-10 overflow-y-auto gap-y-4 flex flex-col">
        <h3 className="md:text-2xl text-xl lg:text-3xl tracking-wide">
          {currentMail?.subject}
        </h3>
        <div className="rounded-lg p-4 bg-[#F1EFEF] w-fit flex items-start flex-col">
          <p className="font-semibold">From: {currentMail?.sender}</p>
          <p>To: {auth.currentUser?.email}</p>
          <p>Date: {formattedDate} </p>
        </div>
        <h4
          className="text-lg"
          dangerouslySetInnerHTML={createMarkup(currentMail?.body!)}
        />
      </div>
    </div>
  );
};

export default InboxMail;
