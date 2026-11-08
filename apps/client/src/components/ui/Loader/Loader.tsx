import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <Loader2 className="h-12 w-12 animate-spin text-brand-accent" />
    </div>
  );
};
