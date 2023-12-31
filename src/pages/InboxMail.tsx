import Loader from "@/components/loader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useOverlayStore from "@/hooks/useOverlayStore";
import useReceivedMailStore from "@/hooks/useReceivedMailStore";
import { auth, firestore } from "@/lib/firebase";
import { ReceivedMail } from "@/lib/types";
import { createMarkup, formatDate } from "@/lib/utils";
import { doc, updateDoc } from "firebase/firestore";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const InboxMail = () => {
  const { id } = useParams();
  const { loading, mails } = useReceivedMailStore();
  const { onOpen } = useOverlayStore();

  if (loading) {
    return <Loader style="h-full" />;
  }

  const currentMail: ReceivedMail | undefined = mails?.find(
    (mail) => mail.id === id
  );

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

  const formattedDate = formatDate({ date: currentMail.date }, true);

  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100vh" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-white rounded-lg w-full h-full md:pb-10 pt-3 flex flex-col gap-3"
    >
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
        <div className="rounded-lg text-xs md:text-sm p-4 bg-[#F1EFEF] w-fit flex items-start flex-col">
          <p className="font-semibold">From: {currentMail?.sender}</p>
          <p>To: {auth.currentUser?.email} (you)</p>
          <p>Date: {formattedDate} </p>
        </div>
        <h4
          className="text-md md:text-lg"
          dangerouslySetInnerHTML={createMarkup(currentMail?.body!)}
        />
      </div>
    </motion.div>
  );
};

export default InboxMail;
