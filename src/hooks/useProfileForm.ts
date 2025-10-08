// hooks/useProfileForm.ts
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseConfig";
import useProfileUpdate from "@/hooks/useProfileUpdate";

const useProfileForm = () => {
  const { updateUserName, updateUserEmail, loading, error, success } = useProfileUpdate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (name !== user.displayName) {
      await updateUserName(name);
    }

    if (email !== user.email && password) {
      await updateUserEmail(email, password);
    }
  };

  return { name, setName, email, setEmail, password, setPassword, handleSave, loading, error, success };
};

export default useProfileForm;
