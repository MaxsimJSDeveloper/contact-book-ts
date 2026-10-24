import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  fetchContacts,
  setContactTypeFilter,
  setIsFavoriteFilter,
  setSortParams,
} from "@/redux/contacts";
import { Star, ChevronDown, ArrowUpDown } from "lucide-react";

export const ContactFilters = () => {
  const dispatch = useAppDispatch();
  const filter = useSelector((state: RootState) => state.contacts.filter);
  const sort = useSelector((state: RootState) => state.contacts.sort);

  // При зміні будь-якого фільтра завжди скидаємо на 1-шу сторінку!
  const handleTypeChange = (value: string) => {
    const type = value === "all" ? undefined : (value as "home" | "personal");
    dispatch(setContactTypeFilter(type));
    dispatch(fetchContacts({ page: 1, contactType: type }));
  };

  const handleFavouriteToggle = () => {
    const nextFav = filter.isFavorite ? undefined : true;
    dispatch(setIsFavoriteFilter(nextFav));
    dispatch(fetchContacts({ page: 1, isFavorite: nextFav }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [string, "asc" | "desc"];
    dispatch(setSortParams({ sortBy, sortOrder }));
    dispatch(fetchContacts({ page: 1, sortBy, sortOrder }));
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#00242a]/30 p-3 backdrop-blur-md">
      {/* Ліва група: Фільтри */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Фільтр за типом */}
        <div className="relative">
          <select
            value={filter.contactType || "all"}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="h-9 cursor-pointer appearance-none rounded-xl border-none bg-white/90 pl-3 pr-8 text-xs font-bold text-gray-800 outline-none transition-all hover:bg-white focus:ring-2 focus:ring-brand-accent"
          >
            <option value="all">All Types</option>
            <option value="home">Home</option>
            <option value="personal">Personal</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
        </div>

        {/* Кнопка "Тільки обрані" */}
        <button
          onClick={handleFavouriteToggle}
          type="button"
          className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition-all ${
            filter.isFavorite
              ? "bg-yellow-400 text-gray-900 shadow-md"
              : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
          }`}
        >
          <Star
            className="h-3.5 w-3.5"
            fill={filter.isFavorite ? "currentColor" : "none"}
          />
          Favourites
        </button>
      </div>

      {/* Права група: Сортування */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={`${sort.sortBy}-${sort.sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-9 cursor-pointer appearance-none rounded-xl border-none bg-white/90 pl-8 pr-8 text-xs font-bold text-gray-800 outline-none transition-all hover:bg-white focus:ring-2 focus:ring-brand-accent"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="_id-desc">Newest First</option>
            <option value="_id-asc">Oldest First</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-600" />
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
        </div>
      </div>
    </div>
  );
};
