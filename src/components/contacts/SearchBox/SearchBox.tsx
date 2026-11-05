import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchContacts, setNameFilter } from "@/redux/contacts";

export const SearchBox = () => {
  const dispatch = useAppDispatch();
  const filterName = useSelector(
    (state: RootState) => state.contacts.filter.name || "",
  );
  const [searchValue, setSearchValue] = useState(filterName);

  useEffect(() => {
    setSearchValue(filterName);
  }, [filterName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filterName) {
        dispatch(setNameFilter(searchValue));
        dispatch(fetchContacts({ page: 1, name: searchValue }));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, filterName, dispatch]);

  const handleClear = () => {
    setSearchValue("");
    dispatch(setNameFilter(""));
    dispatch(fetchContacts({ page: 1, name: "" }));
  };

  return (
    <div className="w-full rounded-[24px] bg-[#d9ebee] p-5 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-gray-800">
        Find your contacts
      </h3>
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="h-10 w-full rounded-xl bg-white pl-10 pr-9 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
