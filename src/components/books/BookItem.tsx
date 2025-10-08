"use client";

import React from "react";
import Link from "next/link";
interface BookItemProps {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  onViewDetails?: (id: string) => void;
  onRequestExchange?: (id: string) => void;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

const BookItem: React.FC<BookItemProps> = ({ id, title, author, imageUrl, onViewDetails, onRequestExchange, onDelete, isOwner = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-gray-500 text-sm">Немає фото</div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <Link href={`/books/${id}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{title}</h3>
          </Link>
          <p className="text-sm text-gray-600 font-medium">
            Автор: <span className="text-gray-800">{author}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(id)}
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Деталі
            </button>
          )}

          {!isOwner && onRequestExchange && (
            <button
              onClick={() => onRequestExchange(id)}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Обміняти
            </button>
          )}

          {isOwner && onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Видалити
            </button>
          )}

          {isOwner && !onDelete && <div className="flex-1 text-center py-2 text-sm text-gray-500 font-medium">Ваша книга</div>}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
