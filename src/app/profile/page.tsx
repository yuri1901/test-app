"use client";
import useProfileForm from "@/hooks/useProfileForm";
import Link from "next/link";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { name, setName, email, setEmail, password, setPassword, handleSave, loading, error, success } = useProfileForm();
  const books = useSelector((state: any) => state.books.books);

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Профіль</h1>
          <Link
            href="/books"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="-ml-0.5 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            До книг
          </Link>
        </div>

        <div className="px-6 py-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Редагування профілю</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Ім'я
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль (для підтвердження email)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Збереження..." : "Зберегти зміни"}
            </button>

            {error && <p className="text-red-500 mt-3">{error}</p>}
            {success && <p className="text-green-600 mt-3">{success}</p>}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Мої книги</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Загальна кількість книг:</p>
              <p className="text-2xl font-bold text-gray-900">{books.length}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
