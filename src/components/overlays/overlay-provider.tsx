import DeleteModal from "./delete-modal";
import ProfileModal from "./profile-modal";
import ResetPasswordModal from "./reset-password-modal";

const OverlayProvider = () => {
  return (
    <>
      <ProfileModal />
      <DeleteModal />
      <ResetPasswordModal />
    </>
  );
};

export default OverlayProvider;
