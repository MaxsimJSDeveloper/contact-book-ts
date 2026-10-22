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
    /* w-full позволяет гриду плавно управлять шириной карточки */
    <div className="relative flex w-full flex-col justify-between rounded-2xl bg-[#d9ebee] p-3.5 shadow-sm transition-all hover:shadow-md">
      {/* 1. Шапка: Аватарка + Имя + Звездочка */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            {...stringAvatar(name)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          />
          <p
            className="truncate font-bold text-[#00242a] text-[15px] leading-tight"
            title={name}
          >
            {name}
          </p>
        </div>

        <button
          onClick={handleToggleFavourite}
          className="shrink-0 p-1 text-yellow-500 transition-transform hover:scale-110"
          type="button"
        >
          <Star
            className="h-4 w-4"
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* 2. Основные данные: Телефон (четко выделен) и Email */}
      <div className="my-3 flex flex-col gap-1.5 text-[13px] font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-brand-accent" />
          <span className="truncate font-semibold text-[#003d47]">
            {phoneNumber}
          </span>
        </div>
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 shrink-0 text-brand-accent" />
            <span className="truncate text-gray-600">{email}</span>
          </div>
        )}
      </div>

      {/* 3. Подвал: Тег типа контактов + Кнопки действий */}
      <div className="flex items-center justify-between border-t border-black/5 pt-2">
        <span className="flex items-center gap-1 rounded-md bg-white/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-accent">
          {contactType === "home" ? (
            <Home className="h-3 w-3" />
          ) : (
            <User className="h-3 w-3" />
          )}
          {contactType}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(contactInfo)}
            className="rounded p-1 text-brand-accent transition-colors hover:bg-white/60 hover:text-[#006c7e]"
            type="button"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="rounded p-1 text-[#b31818] transition-colors hover:bg-white/60 hover:text-[#a90006]"
            type="button"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
