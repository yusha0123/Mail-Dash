import DeleteModal from "./delete-modal";
import ProfileModal from "./profile-modal";

const OverlayProvider = () => {
  return (
    <>
      <ProfileModal />
      <DeleteModal />
    </>
  );
};

export default OverlayProvider;
