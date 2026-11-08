import { logoutUser } from "@/redux/auth";
import { useAppDispatch } from "@/redux/hooks";

interface LogoutProps {
  onClose: () => void;
}

export const Logout = ({ onClose }: LogoutProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="mx-auto mt-12 flex w-full items-center justify-center bg-transparent text-[24px] text-[#fafafa] transition-colors hover:text-brand-accent"
      onClick={() => {
        dispatch(logoutUser());
        onClose();
      }}
    >
      Logout
    </button>
  );
};
