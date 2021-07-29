import { ReactComponent as GithubSVG } from "../assets/github.svg";
import { ReactComponent as LogoSVG } from "../assets/send.svg";
function Header() {
  return (
    <header className="mb-8 flex justify-between items-center ">
      <div className="flex space-x-2 items-center">
        <LogoSVG />{" "}
        <h1 className="text-2xl font-black tracking-wider ">postoffice</h1>
      </div>
      <div className="px-2 pt-1">
        <a
          href="https://github.com/lordinkavu/postoffice"
          target="_blank"
          rel="noreferrer"
        >
          <GithubSVG />
        </a>
      </div>
    </header>
  );
}

export default Header;
