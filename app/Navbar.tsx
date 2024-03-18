"use client";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdNearbyError } from "react-icons/md";
import { Spinner } from "./components";

const Navbar = () => {
  return (
    <nav>
      <Flex justify="between" py="4" mx="5">
        <Flex gap="5" align="center">
          <Logo />
          <NavLinks />
        </Flex>
        <Flex align="center">
          <Profile />
        </Flex>
      </Flex>
    </nav>
  );
};

export const Profile = () => {
  const { status, data: session } = useSession();

  return (
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
        <Link className="nav-links" href="/api/auth/signin">
          Login
        </Link>
      )}
      {status == "loading" && <Spinner />}
    </div>
  );
};

export const Logo = () => {
  return (
    <Link href="/" className="btn btn-ghost text-xl">
      Issue Tracker <MdNearbyError />
    </Link>
  );
};

export const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex gap-8">
      {links.map((link) => (
        <li
          key={link.href}
          className={classNames({
            "nav-links-active": currentPath === link.href,
            "nav-links": link.href !== currentPath,
            "nav-links-hover": true,
          })}
        >
          <Link className="transition-colors" href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
