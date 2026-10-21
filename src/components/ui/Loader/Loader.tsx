// import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-accent border-t-transparent" />
    </div>
  );
};