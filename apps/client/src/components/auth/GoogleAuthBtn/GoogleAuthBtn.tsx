import { useState } from "react";
import { api } from "@/api/contactsApi";
import toast from "react-hot-toast";
import { Google } from "@/components/ui";

export const GoogleAuthBtn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/auth/get-oauth-url");

      window.location.href = data.data.url;
    } catch (error: unknown) {
      toast.error(`Failed to initialize Google login ${error as string} `);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="mt-3 flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50"
    >
      <Google />
    </button>
  );
};
