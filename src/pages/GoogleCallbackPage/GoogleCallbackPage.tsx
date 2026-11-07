import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { confirmGoogleOAuth } from "@/redux/auth/operations";
import { Loader } from "@/components/ui";
import toast from "react-hot-toast";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isExecuted = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      toast.error("Google authentication code missing");
      navigate("/login");
      return;
    }

    if (isExecuted.current) return;
    isExecuted.current = true;

    dispatch(confirmGoogleOAuth({ code }))
      .unwrap()
      .then(() => {
        toast.success("Successfully logged in with Google!");
        navigate("/contacts");
      })
      .catch((err: unknown) => {
        toast.error((err as string) || "Google authentication failed");
        navigate("/login");
      });
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader />
      <p className="text-gray-600 font-medium">
        Completing Google Authentication...
      </p>
    </div>
  );
};

export default GoogleCallbackPage;
