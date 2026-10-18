import { Trash2, Edit2 } from "lucide-react";
import { Contact } from "@/types/general";
import { stringAvatar } from "@/utils";

interface ContactItemProps {
  contactInfo: Contact;
}

export const ContactItem = ({ contactInfo }: ContactItemProps) => {
  const { name, phoneNumber } = contactInfo;

  return (
    <div className="flex h-[96px] w-full max-w-[310px] items-center rounded-2xl bg-[#d9ebee] p-4 shadow-sm transition-shadow hover:shadow-md">
      <div
        {...stringAvatar(name)}
        className="mr-3.5 flex shrink-0 items-center justify-center rounded-full"
      />

      <div className="mr-auto flex flex-col gap-1 text-[14px]">
        <p className="max-w-[140px] truncate font-semibold text-[#00242a]">
          {name}
        </p>
        <p className="text-brand-accent">{phoneNumber}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          className="rounded p-2 text-brand-accent transition-colors hover:bg-white/50 hover:text-[#006c7e]"
          type="button"
        >
          <Edit2 className="h-5 w-5" />
        </button>
        <button
          className="rounded p-2 text-[#b31818] transition-colors hover:bg-white/50 hover:text-[#a90006]"
          type="button"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
