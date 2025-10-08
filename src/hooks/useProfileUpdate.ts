import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateUserName = async (newName: string) => {
    if (!auth.currentUser) {
      setError("Користувача не знайдено");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(auth.currentUser, { displayName: newName });
      setSuccess("Ім’я оновлено успішно");
    } catch (err: any) {
      setError("Не вдалося оновити ім’я");
    } finally {
      setLoading(false);
    }
  };
  const updateUserEmail = async (newEmail: string, password: string) => {
    if (!auth.currentUser || !auth.currentUser.email) {
      setError("Користувача не знайдено");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updateEmail(auth.currentUser, newEmail);
      setSuccess("Email оновлено успішно");
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        setError("Невірний пароль");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Цей email вже використовується");
      } else {
        setError("Не вдалося оновити email");
      }
    } finally {
      setLoading(false);
    }
  };
  return { updateUserName, updateUserEmail, loading, error, success };
};

export default useProfileUpdate;
