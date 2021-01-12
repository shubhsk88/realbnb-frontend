import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
export default function Header() {
  const { pathname } = useRouter();

  return (
    <header>
      <Link href="/">
        <a className={pathname === "/" ? "is-active" : ""}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === "/about" ? "is-active" : ""}>
          <Button mx={4} my={4}>
            Hello
          </Button>
        </a>
      </Link>
      <Link href="/client-only">
        <a className={pathname === "/client-only" ? "is-active" : ""}>
          Client-Only
        </a>
      </Link>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
}
