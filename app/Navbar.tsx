"use client";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdNearbyError } from "react-icons/md";
import { Spinner } from "./components";
import { Container, Flex } from "@radix-ui/themes";
import Image from "next/image";

const Navbar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav>
      <Flex justify="between" py="4" mx="5">
        <Flex gap="5" align="center">
          <Link href="/" className="btn btn-ghost text-xl">
            Issue Tracker <MdNearbyError />
          </Link>
          <ul className="flex gap-8">
            {links.map((link) => (
              <li
                key={link.href}
                className={
                  classNames({
                    "text-zinc-950": currentPath === link.href,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-black transition-colors": true,
                  })

                  // key : value
                }
              >
                <Link className="transition-colors" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Flex align="center">
          <div className="transition-colors">
            {status === "authenticated" && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User Profile Image"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <img
                        referrerPolicy="no-referrer"
                        alt="User Profile Image"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    )}
                  </div>
                </div>
                <ul className="shadow menu menu-sm dropdown-content bg-base-100 rounded-box space-y-3 p-3">
                  <li>{session.user?.email}</li>
                  {status === "authenticated" && (
                    <li>
                      <Link href="/api/auth/signout">Log out</Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
            {status == "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
            {status == "loading" && <Spinner />}
          </div>
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
