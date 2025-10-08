import Link from "next/link";
type PageButton = "/me/books" | "books";
interface BookNavLinksProps {
  name: string;
  type: PageButton;
}
const BookNavLinks = ({ name, type }: BookNavLinksProps) => {
  return (
    <Link href={type}>
      <button className="hover:text-gray-300">{name}</button>
    </Link>
  );
};
export default BookNavLinks;
