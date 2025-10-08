import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, sendPasswordResetEmail, type User } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export interface FormData {
  name: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  auth?: string;
}

const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken().then((token) => localStorage.setItem("authToken", token));
      } else {
        localStorage.removeItem("authToken");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors] || errors.auth) {
      setErrors((prev) => ({ ...prev, [name]: undefined, auth: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = "Ім'я є обов'язковим";
      else if (formData.name.trim().length < 2) newErrors.name = "Ім'я повинно містити принаймні 2 символи";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email є обов'язковим";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Невірний формат email";

    if (!formData.password) newErrors.password = "Пароль є обов'язковим";
    else if (formData.password.length < 6) newErrors.password = "Пароль повинен містити принаймні 6 символів";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: formData.name });

          // 🔹 Додаємо роль в Firestore
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            displayName: formData.name,
            email: formData.email,
            role: "user", // роль за замовчуванням
          });
        }
      }

      router.push("/books");
      setFormData({ name: "", email: "", password: "" });
    } catch (error: any) {
      let message = "Сталася помилка. Спробуйте ще раз.";
      if (error.code === "auth/email-already-in-use") message = "Цей email вже використовується";
      else if (error.code === "auth/user-not-found") message = "Користувача з таким email не існує";
      else if (error.code === "auth/wrong-password") message = "Невірний пароль";
      setErrors({ auth: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem("authToken");
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Лист для скидання пароля надіслано на вашу електронну пошту.");
    } catch (error: any) {
      let message = "Не вдалося скинути пароль. Спробуйте ще раз.";
      if (error.code === "auth/user-not-found") message = "Користувача з таким email не знайдено.";
      alert(message);
    }
  };

  return { formData, errors, isSubmitting, currentUser, handleInputChange, handleSubmit, logout, resetPassword };
};

export default useAuth;
