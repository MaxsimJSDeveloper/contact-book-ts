import { Trash2, Edit2, Star, Mail, Phone, Home, User } from "lucide-react";
import { Contact } from "@/types/general";
import { stringAvatar } from "@/utils";
import { useAppDispatch } from "@/redux/hooks";
import { updateContact } from "@/redux/contacts";

interface ContactItemProps {
  contactInfo: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactItem = ({
  contactInfo,
  onEdit,
  onDelete,
}: ContactItemProps) => {
  const { _id, name, phoneNumber, email, isFavourite, contactType } =
    contactInfo;
  const dispatch = useAppDispatch();

  const handleToggleFavourite = () => {
    dispatch(
      updateContact({ id: _id, contactData: { isFavourite: !isFavourite } }),
    );
  };

  return (
    <div className="relative flex w-full max-w-[310px] flex-col rounded-2xl bg-[#d9ebee] p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            {...stringAvatar(name)}
            className="flex shrink-0 items-center justify-center rounded-full"
          />
          <div className="flex flex-col">
            <p className="max-w-[170px] truncate font-semibold text-[#00242a]">
              {name}
            </p>
            <span className="mt-0.5 flex w-max items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-accent">
              {contactType === "home" ? (
                <Home className="h-3 w-3" />
              ) : (
                <User className="h-3 w-3" />
              )}
              {contactType}
            </span>
          </div>
        </div>

        <button
          onClick={handleToggleFavourite}
          className="p-1 text-yellow-500 transition-transform hover:scale-110"
          type="button"
        >
          <Star
            className="h-5 w-5"
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1.5 text-[13px] font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-brand-accent" />
          <span>{phoneNumber}</span>
        </div>
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-brand-accent" />
            <span className="truncate">{email}</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-end gap-1 border-t border-white/50 pt-2">
        <button
          onClick={() => onEdit(contactInfo)}
          className="rounded p-1.5 text-brand-accent transition-colors hover:bg-white/50 hover:text-[#006c7e]"
          type="button"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="rounded p-1.5 text-[#b31818] transition-colors hover:bg-white/50 hover:text-[#a90006]"
          type="button"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
