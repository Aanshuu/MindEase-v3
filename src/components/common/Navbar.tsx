"use client";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { ArrowRight, User } from "lucide-react";
import { TransitionLink } from "@/lib/TransitionLink";
import ThemeToggle from "../ThemeToggle";
import { useCurrentUser, pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();

  const currentUser = useCurrentUser();
  const userEmail = currentUser ? currentUser.email : null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    pb.authStore.clear();
    router.push("/signUp");
  };

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:bg-black dark:border-black">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
          <TransitionLink
            href="/"
            className="flex z-40 font-semibold dark:text-white"
          >
            <span>MindEase.</span>
          </TransitionLink>

          {/* Mobile Navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <ThemeToggle />
              {currentUser ? (
                <>
                  <button
                    onClick={handleLogout}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "dark:text-white",
                    })}
                  >
                    Log Out
                  </button>
                  <div className="relative">
                    <User
                      size={30}
                      className="cursor-pointer bg-black text-white dark:bg-white dark:text-black rounded-full p-1"
                      onClick={toggleDropDown}
                    />
                    {showDropDown && (
                      <ul className="absolute top-full right-0 mt-2 w-48 text-[12px] shadow-md p-4 rounded-xl bg-black text-white  dark:bg-white dark:text-black">
                        <li>{userEmail}</li>
                      </ul>
                    )}
                  </div>
                </>//z-10 absolute top-1 right-64
              ) : (
                <>
                  <TransitionLink
                    href="/signUp"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "dark:text-white",
                    })}
                  >
                    Sign In
                  </TransitionLink>
                  <TransitionLink
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      className:
                        "bg-black text-white dark:bg-white dark:text-black",
                    })}
                  >
                    Get Started{" "}
                    <ArrowRight className="ml-1.5 h-5 w-5 dark:text-black" />
                  </TransitionLink>
                </>
              )}
              {/* <TransitionLink
                href="/study"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </TransitionLink> */}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
export default Navbar;
