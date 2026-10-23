import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/redux/hooks";
import {
  fetchContacts,
  selectContacts,
  selectError,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from "@/redux/contacts";
import { RootState } from "@/redux/store";

import { Loader, Pagination } from "@/components/ui";
import {
  AddContactBtn,
  ContactList,
  AddContactModalContent,
} from "@/components/contacts";

const getResponsivePerPage = () => {
  if (window.innerWidth >= 1024) return 9;
  if (window.innerWidth >= 768) return 6;
  return 3;
};

const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const contacts = useSelector(selectContacts);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);

  const perPage = useSelector((state: RootState) => state.contacts.perPage);

  useEffect(() => {
    dispatch(fetchContacts({ page, perPage: getResponsivePerPage() }));
  }, [dispatch, page]);


  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const newPerPage = getResponsivePerPage();
        if (newPerPage !== perPage) {
          dispatch(fetchContacts({ page: 1, perPage: newPerPage }));
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [dispatch, perPage]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      <main className="mx-auto flex min-h-[75vh] w-full max-w-[1280px] flex-col px-4 md:px-8">
        {error && (
          <p className="mb-4 text-center text-red-400">Error! Try again</p>
        )}
        {loading && <Loader />}

        <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-1 flex-col min-h-[580px]">
            <ContactList contacts={contacts} />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                dispatch(fetchContacts({ page: newPage }))
              }
            />
          </div>

          <div className="hidden shrink-0 lg:sticky lg:top-24 lg:flex lg:w-[330px]">
            <AddContactModalContent />
          </div>
        </div>
      </main>

      <AddContactBtn />
    </HelmetProvider>
  );
};

export default ContactsPage;
