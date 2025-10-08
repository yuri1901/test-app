"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const authType = searchParams.get("type") || "login";
  const isLogin = authType === "login";

  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } = useAuth(isLogin);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLogin ? "Вхід" : "Реєстрація"}</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ім'я *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введіть ваше ім'я"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Введіть ваш email"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Пароль *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Введіть пароль"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {errors.auth && <div className="text-center text-red-500 text-sm">{errors.auth}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition disabled:opacity-60"
          >
            {isSubmitting ? (isLogin ? "Вхід..." : "Реєстрація...") : isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? (
            <>
              Немає акаунта?{" "}
              <Link
                href="/auth?type=register"
                className="text-blue-600 hover:underline"
              >
                Зареєструватися
              </Link>
            </>
          ) : (
            <>
              Вже маєте акаунт?{" "}
              <Link
                href="/auth?type=login"
                className="text-blue-600 hover:underline"
              >
                Увійти
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
