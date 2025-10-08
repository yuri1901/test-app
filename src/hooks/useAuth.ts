import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";

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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  console.log(token);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken().then((idToken) => {
          setToken(idToken);
          localStorage.setItem("authToken", idToken);
        });
      } else {
        setToken(null);
        localStorage.removeItem("authToken");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    clearForm();
  }, [isLogin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors] || errors.auth) {
      setErrors((prev) => ({ ...prev, [name]: undefined, auth: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Ім'я є обов'язковим";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Ім'я повинно містити принаймні 2 символи";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль повинен містити принаймні 6 символів";
    }

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
        }
      }

      const user = userCredential.user;
      const idToken = await user.getIdToken();
      setToken(idToken);
      localStorage.setItem("authToken", idToken);
      router.push("/books");
      clearForm();
    } catch (error: any) {
      let message = "Сталася помилка. Спробуйте ще раз.";
      if (error.code === "auth/email-already-in-use") {
        message = "Цей email вже використовується";
      } else if (error.code === "auth/user-not-found") {
        message = "Користувача з таким email не існує";
      } else if (error.code === "auth/wrong-password") {
        message = "Невірний пароль";
      }
      setErrors({ auth: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return {
    formData,
    errors,
    isSubmitting,
    currentUser,
    handleInputChange,
    handleSubmit,
    clearForm,
    logout,
  };
};

export default useAuth;
