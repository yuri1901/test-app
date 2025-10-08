"use client";

import { useState } from "react";
import Modal from "./modal/Modal";
import { useModal } from "@/hooks/useModal";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const PasswordReset = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);

      alert("Посилання для скидання паролю надіслано на ваш email!");
      closeModal();
      setEmail("");
    } catch (error: any) {
      console.error("Помилка скидання паролю:", error);
      alert("Помилка: " + error.message);
    }
  };

  return (
    <>
      {/* Посилання для відкриття модального вікна */}
      <button
        onClick={openModal}
        className="text-sm text-blue-600 hover:text-blue-800 underline"
      >
        Забули пароль?
      </button>

      {/* Модальне вікно через Portal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Скидання паролю"
      >
        <p className="text-sm text-gray-600 mb-4">Введіть вашу email адресу і ми надішлемо вам посилання для скидання паролю.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="reset-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email адреса
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Надіслати
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PasswordReset;
