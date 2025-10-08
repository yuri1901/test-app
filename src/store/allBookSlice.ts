import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  ownerId: string;
  createdAt: string;
  status: "available" | "exchanged";
}

interface BooksState {
  books: Book[];
  error: string | null;
  sortField: "title" | "author";
  sortDirection: "asc" | "desc";
  searchQuery: string;
}

const BOOKS_STORAGE_KEY = "bookExchange_books";

const saveBooksToStorage = (books: Book[]) => {
  try {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error("Error saving books to localStorage:", error);
  }
};

const loadBooksFromStorage = (): Book[] => {
  try {
    const saved = localStorage.getItem(BOOKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading books from localStorage:", error);
    return [];
  }
};

const initialState: BooksState = {
  books: loadBooksFromStorage(),
  error: null,
  sortField: "title",
  sortDirection: "asc",
  searchQuery: "",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<{ title: string; author: string; imageUrl?: string; ownerId: string }>) => {
      const { title, author, imageUrl, ownerId } = action.payload;
      const newBook: Book = {
        id: Date.now().toString(),
        title,
        author,
        imageUrl,
        ownerId,
        createdAt: new Date().toISOString(),
        status: "available",
      };
      state.books.push(newBook);
      saveBooksToStorage(state.books);
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      saveBooksToStorage(state.books);
    },

    updateBookStatus: (state, action: PayloadAction<{ id: string; status: "available" | "exchanged" }>) => {
      const { id, status } = action.payload;
      const book = state.books.find((book) => book.id === id);
      if (book) {
        book.status = status;
        saveBooksToStorage(state.books);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    setSortField: (state, action: PayloadAction<"title" | "author">) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortDirection = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectFilteredAndSortedBooks = (state: { books: BooksState }) => {
  const { books, sortField, sortDirection, searchQuery } = state.books;

  // 1. ФІЛЬТРУЄМО за пошуковим запитом
  let filteredBooks = books;
  if (searchQuery.trim()) {
    filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // 2. СОРТУЄМО відфільтровані книги
  return [...filteredBooks].sort((a, b) => {
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();

    if (sortDirection === "asc") {
      return fieldA.localeCompare(fieldB, "uk");
    } else {
      return fieldB.localeCompare(fieldA, "uk");
    }
  });
};

export const { addBook, removeBook, updateBookStatus, setError, clearError, setSortField, setSortDirection, setSearchQuery } = bookSlice.actions;
export default bookSlice.reducer;
