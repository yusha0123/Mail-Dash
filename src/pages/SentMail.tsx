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
import useSentMailStore from "@/hooks/useSentMailStore";
import { auth } from "@/lib/firebase";
import { SentMail as Sent_Mail } from "@/lib/types";
import { createMarkup, formatDate } from "@/lib/utils";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const SentMail = () => {
  const { id } = useParams();
  const { loading, mails } = useSentMailStore();
  const { onOpen } = useOverlayStore();

  if (loading) {
    return <Loader style="h-full" />;
  }

  const currentMail: Sent_Mail | undefined = mails?.find(
    (mail) => mail.id === id
  );

  if (!currentMail) {
    return <Navigate to="/sent" replace />;
  }

  const formattedDate = formatDate({ date: currentMail.date }, true);

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 pt-3 flex flex-col gap-3">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/sent"}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Back to Sent</p>
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
                    mailType: "sent",
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
          <p className="font-semibold">To: {auth.currentUser?.email}</p>
          <p>From: {currentMail?.receiver} (you)</p>
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

export default SentMail;
