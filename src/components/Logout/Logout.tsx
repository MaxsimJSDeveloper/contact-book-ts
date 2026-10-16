import { logoutUser } from "../../redux/auth/operations";
import { useAppDispatch } from "../../redux/hooks";

interface LogoutProps {
  onClose: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      style={{
        marginTop: 50,
        backgroundColor: "inherit",
        border: "none",
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 24,
        color: "#fafafa",
      }}
      onClick={() => {
        dispatch(logoutUser());
        onClose();
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
