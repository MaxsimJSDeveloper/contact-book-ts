import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/redux/hooks";
import {
  fetchContacts,
  selectContacts,
  selectError,
  selectIsLoading,
} from "@/redux/contacts";

import { Loader } from "@/components/ui";
import {
  AddContactBtn,
  ContactList,
  AddContactModalContent,
} from "@/components/contacts";

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      <main className="mx-auto min-h-[75vh] w-full max-w-[1280px] px-4 md:px-8">
        {error && (
          <p className="mb-4 text-center text-red-400">Error! Try again</p>
        )}
        {loading && <Loader />}

        {/* Двухколоночный макет для десктопа */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Левая часть: список контактов */}
          <div className="w-full flex-1">
            <ContactList contacts={contacts} />
          </div>

          {/* Правая часть: боковая панель для десктопа */}
          <div className="hidden shrink-0 flex-col gap-6 lg:flex lg:w-[330px]">
            {/* Здесь при необходимости рендерится блок поиска Filter/Search */}

            {/* Стационарная форма добавления контакта */}
            <AddContactModalContent />
          </div>
        </div>
      </main>

      {/* Плавающая кнопка '+' видна только на мобильных/планшетах */}
      <AddContactBtn />
    </HelmetProvider>
  );
};

export default ContactsPage;
