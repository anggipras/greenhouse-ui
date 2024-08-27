import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 bg-green-50">
      <div className="mx-auto max-w-desktop w-full">
        <div className="flex justify-between items-center h-[88px] px-6 py-3.5 medium:px-15 medium:py-6">
          <Link href="/">
            <div className="max-w-[121px] h-auto medium:max-w-[183px]">
              <Image
                alt="logo"
                className="w-full h-full"
                height="0"
                sizes="100%"
                src={require("@/assets/images/logo.svg")}
                width="0"
              />
            </div>
          </Link>
          <div className="hidden medium:flex">
            <div className="relative inline-block">
              <div className="flex items-center cursor-pointer text-gray-700 p-2.5">
                <div
                  aria-hidden="true"
                  className="text-green-950 text-lg"
                  onClick={() => {
                    void router.push("/jobs");
                  }}
                >
                  Jobs
                </div>
              </div>
            </div>
            <div className="relative inline-block">
              <div className="flex items-center cursor-pointer text-gray-700 p-2.5">
                <div
                  aria-hidden="true"
                  className="text-green-950 text-lg"
                  onClick={() => {
                    void router.push("/candidates");
                  }}
                >
                  Applications
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
