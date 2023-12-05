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
import { Link, useParams } from "react-router-dom";

const InboxMail = () => {
  const { id } = useParams();
  const { loading, mails } = useReceivedMailStore();

  if (loading) {
    return <Loader style="h-full" />;
  }

  const currentMail = mails?.find((mail) => mail.id === id);

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

  return (
    <div className="bg-white rounded-lg w-full h-full md:pb-10 pt-3 flex flex-col gap-3">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/inbox"}
                className={buttonVariants({ variant: "outline", size: "icon" })}
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
              <Button variant={"outline"} size={"icon"} disabled={!currentMail}>
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
    </div>
  );
};

export default InboxMail;
