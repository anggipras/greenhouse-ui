/* eslint-disable react-hooks/exhaustive-deps */
import { useData } from "@/lib/hooks/use-data-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NavBar = () => {
  const router = useRouter();
  const { setLoginDialog, candidateRes, setCandidateDt } = useData();

  useEffect(() => {
    setCandidateDt(
      localStorage.getItem("USER_DETAIL")
        ? JSON.parse(localStorage.getItem("USER_DETAIL") || "")
        : null
    );
  }, []);

  const removeUserDetail = () => {
    localStorage.removeItem("USER_DETAIL");
    setCandidateDt(null);
    router.push("/");
  };

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
          <div className="flex items-center">
            <div className="relative inline-block">
              <div className="flex items-center cursor-pointer text-gray-700 p-2.5">
                <div
                  aria-hidden="true"
                  className="text-green-950 text-lg"
                  onClick={() => {
                    void router.push("/jobs");
                  }}
                >
                  Jobs Search
                </div>
              </div>
            </div>
            {candidateRes ? (
              <>
                <div className="relative inline-block">
                  <div className="flex items-center cursor-pointer text-gray-700 p-2.5">
                    <div
                      aria-hidden="true"
                      className="text-green-950 text-lg"
                      onClick={() => {
                        void router.push("/candidates");
                      }}
                    >
                      My Applications
                    </div>
                  </div>
                </div>
                <div className="relative inline-block">
                  <div className="flex items-center cursor-pointer p-2.5 gap-2">
                    <div aria-hidden="true" className="text-green-700 text-lg">
                      Hi, {candidateRes.first_name} {candidateRes.last_name}
                    </div>
                    <div
                      className="bg-orange-200 p-2 rounded-md font-bold"
                      onClick={() => removeUserDetail()}
                    >
                      Sign Out
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative inline-block">
                <div className="flex items-center cursor-pointer p-2.5 gap-2">
                  <div
                    className="bg-orange-200 p-2 rounded-md font-bold"
                    onClick={() => setLoginDialog(true)}
                  >
                    Sign In
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
