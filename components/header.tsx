import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between px-4 mt-4 md:px-8 mx-auto lg:max-w-7xl">
      <Link href="/">
        <a className="font-semibold">Signature Utils</a>
      </Link>
    </div>
  );
}
