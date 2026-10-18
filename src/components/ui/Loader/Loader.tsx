import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="w-10 h-10 text-brand-accent animate-spin" />
    </div>
  );
};
