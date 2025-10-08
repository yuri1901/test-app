import Link from "next/link";
type StylesButton = "login" | "registre";
interface AuthButtonProps {
  name: string;
  styles: StylesButton;
  type: string;
  onClick?: () => void;
}

const AuthButton = ({ name, styles, type, onClick }: AuthButtonProps) => {
  const stylesButton = {
    login: "px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition ",
    registre: "px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition ",
  };
  return (
    <>
      <Link href={`${type === "login" ? "/auth?type=login" : "/auth?type=register"}`}>
        <button
          onClick={onClick}
          className={stylesButton[styles]}
        >
          {name}
        </button>
      </Link>
    </>
  );
};
export default AuthButton;
