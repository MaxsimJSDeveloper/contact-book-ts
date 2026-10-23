import { RootState } from "@/redux/store";

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectError = (state: RootState) => state.contacts.error;

export const selectPage = (state: RootState) => state.contacts.page;
export const selectTotalPages = (state: RootState) => state.contacts.totalPages;