import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "@/store/allBookSlice";

const useAddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ownerId] = useState("1");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      alert("Будь ласка, заповніть назву книги та автора!");
      return;
    }

    dispatch(addBook({ title, author, imageUrl: imageUrl || undefined, ownerId }));

    setTitle("");
    setAuthor("");
    setImageUrl("");
  };
  return { title, author, imageUrl, setTitle, setAuthor, setImageUrl, handleSubmit };
};

export default useAddBook;
