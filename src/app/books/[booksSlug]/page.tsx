"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useBookDetails } from "@/hooks/useBookDetails";

const BookDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const bookId = params.booksSlug as string;
  const { book, isOwner, handleExchangeRequest, formatDate } = useBookDetails(bookId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Книгу не знайдено</h1>
          <Link
            href="/books"
            className="text-blue-600 hover:underline"
          >
            Повернутися до списку книг
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link
              href="/books"
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              ← Повернутися назад
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Book Image */}
              <div className="md:w-1/3">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-4">📚</div>
                      <div className="text-gray-500">Немає фото</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="md:w-2/3 p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">Автор: {book.author}</p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Додано: {formatDate(book.createdAt)}</p>
                    <p>
                      Статус: <span className={`font-medium ${book.status === "available" ? "text-green-600" : "text-orange-600"}`}>{book.status === "available" ? "Доступна для обміну" : "Обмінюється"}</span>
                    </p>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Власник книги</h3>
                  <p className="text-gray-600">ID власника: {book.ownerId}</p>
                  {isOwner && <p className="text-blue-600 font-medium mt-1">Це ваша книга</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {!isOwner && (
                    <button
                      onClick={handleExchangeRequest}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      📧 Запросити обмін
                    </button>
                  )}

                  {isOwner && (
                    <div className="flex gap-4 w-full">
                      <button className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">✏️ Редагувати</button>
                      <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">🗑️ Видалити</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;
