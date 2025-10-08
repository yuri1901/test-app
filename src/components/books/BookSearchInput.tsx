import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/allBookSlice";
import { RootState } from "@/store/store";

const BookSearchInput = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.books.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Пошук за назвою або автором..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};

export default BookSearchInput;
