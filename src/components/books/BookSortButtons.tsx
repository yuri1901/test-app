import { useDispatch, useSelector } from "react-redux";
import { setSortField, setSortDirection } from "@/store/allBookSlice";
import { RootState } from "@/store/store";

const BookSortButtons = () => {
  const dispatch = useDispatch();
  const { sortField, sortDirection } = useSelector((state: RootState) => state.books);

  const handleSort = (field: "title" | "author", direction: "asc" | "desc") => {
    dispatch(setSortField(field));
    dispatch(setSortDirection(direction));
  };

  const isActive = (field: "title" | "author", direction: "asc" | "desc") => {
    return sortField === field && sortDirection === direction;
  };
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => handleSort("title", "asc")}
        className={`px-4 py-2 rounded-lg font-medium transition ${isActive("title", "asc") ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        Назва A → Z
      </button>
      <button
        onClick={() => handleSort("title", "desc")}
        className={`px-4 py-2 rounded-lg font-medium transition ${isActive("title", "desc") ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        Назва Z → A
      </button>
    </div>
  );
};

export default BookSortButtons;
