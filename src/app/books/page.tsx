"use client";
import BookNavList from "@/components/books/BookNavList";
import AuthButton from "@/components/home/AuthButton";
import Account from "@/components/books/Account";
import BookItem from "@/components/books/BookItem";
import BookSortButtons from "@/components/books/BookSortButtons";
import BookSearchInput from "@/components/books/BookSearchInput";
import AddBook from "@/components/books/AddBook";

import { useAuthContext } from "@/context/ContextAuth";

import { useSelector, useDispatch } from "react-redux";
import { removeBook } from "@/store/allBookSlice";
import { selectFilteredAndSortedBooks } from "@/store/allBookSlice";
import Link from "next/link";

const BookPage = () => {
  const { currentUser } = useAuthContext();
  const books = useSelector(selectFilteredAndSortedBooks);
  const dispatch = useDispatch();

  return currentUser ? (
    <section className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <BookNavList
            name="Мої книги"
            type="/me/books"
          />
          <BookNavList
            name="Всі книги"
            type="books"
          />
        </div>
        <Account />
      </nav>

      <div className="container mx-auto p-8">
        <AddBook />

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Всі книги</h2>
          <div className="flex flex-col">
            <BookSortButtons />
            <BookSearchInput />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => {
              return (
                <BookItem
                  key={book.id}
                  {...book}
                  onDelete={(id) => dispatch(removeBook(id))}
                  isOwner={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* img */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Доступ заборонено</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">Щоб переглянути книги, вам потрібно увійти в систему або зареєструватися</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <AuthButton
            name="Увійти в систему"
            styles="login"
            type="login"
            onClick={() => (window.location.href = "/auth?type=login")}
          />
          <AuthButton
            name="Зареєструватися"
            styles="registre"
            type="register"
            onClick={() => (window.location.href = "/auth?type=register")}
          />
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
          >
            {" "}
            ← Повернутися на головну
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
