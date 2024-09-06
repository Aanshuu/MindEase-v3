"use client"

import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/lib/TransitionLink";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:bg-black dark:border-black">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
          <TransitionLink href="/" className="flex z-40 font-semibold dark:text-white">
            <span>MindEase.</span>
          </TransitionLink>

          {/* Mobile Navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <ThemeToggle/>
              {/* <TransitionLink
                href="/study"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </TransitionLink> */}
              <TransitionLink
                href="/signUp"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className:"dark:text-white"
                })}
              >
                Sign In
              </TransitionLink>
              <TransitionLink
                href="/dashboard"
                className={buttonVariants({
                  size: "sm",
                  className: "bg-black text-white dark:bg-white dark:text-black",
                })}
              >
                Get Started <ArrowRight className="ml-1.5 h-5 w-5 dark:text-black"/>
              </TransitionLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
export default Navbar;