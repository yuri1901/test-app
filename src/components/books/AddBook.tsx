import useAddBook from "@/hooks/useAddBook";

const AddBook = () => {
  const { title, author, imageUrl, setTitle, setAuthor, setImageUrl, handleSubmit } = useAddBook();
  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg mb-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">Додати книгу</h2>
      <input
        type="text"
        placeholder="Назва книги"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Автор"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="url"
        placeholder="Фото (URL) - необов'язково"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button className="bg-green-600 px-6 py-2 rounded text-white hover:bg-green-700">Додати книгу</button>
    </form>
  );
};

export default AddBook;
