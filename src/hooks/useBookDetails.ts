import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuthContext } from "@/context/ContextAuth";

export const useBookDetails = (bookId: string) => {
  const { currentUser } = useAuthContext();
  const books = useSelector((state: RootState) => state.books.books);

  const book = books.find((b) => b.id === bookId);

  const isOwner = book ? book.ownerId === currentUser?.uid : false;

  const userBooks = books.filter((b) => b.ownerId === currentUser?.uid);

  const handleExchangeRequest = () => {
    if (!currentUser) {
      alert("Будь ласка, увійдіть в систему");
      return;
    }

    if (!book) {
      alert("Книгу не знайдено");
      return;
    }

    if (isOwner) {
      alert("Ви не можете запросити обмін на свою книгу");
      return;
    }

    const subject = `Запит на обмін книгою: ${book.title}`;
    const body = `
Привіт!

Я хочу обміняти свою книгу на "${book.title}" автора ${book.author}.

Мої книги для обміну:
${userBooks.map((userBook) => `- ${userBook.title} (${userBook.author})`).join("\n")}

Мій email: ${currentUser.email}
Моє ім'я: ${currentUser.displayName || "Користувач"}
    `.trim();

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA");
  };

  return {
    book,
    isOwner,
    userBooks,
    handleExchangeRequest,
    formatDate,
    currentUser,
  };
};
