import { useParams } from "react-router-dom";

const InboxMail = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default InboxMail;
