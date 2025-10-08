import Logo from "@/components/home/Logo";
import AuthButton from "@/components/home/AuthButton";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <Logo />
        <div className="flex space-x-4">
          <AuthButton
            name="Login"
            styles="login"
            type="login"
          />
          <AuthButton
            name="Register"
            styles="registre"
            type="register"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-4xl font-bold mt-12">Ласкаво просимо до BookShare 📚</h1>
        <p className="text-gray-600 max-w-2xl mt-4">Це місце, де читачі можуть ділитися своїми улюбленими книгами, знаходити нові історії та обмінюватися літературою з іншими користувачами.</p>
        <p className="text-gray-600 max-w-2xl mt-3">Створіть акаунт, щоб додавати власні книги, переглядати колекції інших і надсилати запити на обмін.</p>
      </main>

      {/* FOOTER */}
      <footer className="py-4 bg-white border-t text-center text-sm text-gray-500">© {new Date().getFullYear()} BookShare — Об’єднуємо читачів усього світу.</footer>
    </div>
  );
};

export default Home;
