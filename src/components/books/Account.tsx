"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/ContextAuth";

const Account = () => {
  const { currentUser, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth?type=login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="flex items-center space-x-4">
      <span>{currentUser?.displayName}</span>
      <button
        className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
        onClick={handleLogout}
      >
        Вийти
      </button>
    </div>
  );
};

export default Account;
