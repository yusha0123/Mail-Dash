import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteMail from "@/hooks/useDeleteMail";
import useOverlayStore from "@/hooks/useOverlayStore";
import { redirect } from "react-router-dom";

const DeleteModal = () => {
  const { type, onClose, isOpen, additionalData } = useOverlayStore();
  const isModalOpen = isOpen && type === "deleteModal";
  const { loading, deleteMail } = useDeleteMail();
  const redirectPath =
    additionalData.mailType === "received" ? "/inbox" : "/sent";

  const handleDelete = () => {
    if (additionalData.mailType && additionalData.id) {
      deleteMail(additionalData.mailType, additionalData.id, handleSuccess);
    }
  };

  const handleSuccess = () => {
    redirect(redirectPath);
    onClose();
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center mb-5">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and it will permanently this mail.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            isLoading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
