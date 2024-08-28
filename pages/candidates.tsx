import API from "@/api/api";
import clientConfig from "@/client.config";
import CandidateAppCard from "@/modules/components/candidateAppCard";
import { CandidateAppRes } from "@/types/candidateAppRes";
import { CandidateRes } from "@/types/candidateRes";
import type { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";

const CandidatesPage = () => {
  const [candidateApp, setCandidateApp] = useState<CandidateAppRes[] | null>();
  useEffect(() => {
    if (localStorage.getItem("USER_DETAIL")) {
      const app = JSON.parse(
        localStorage.getItem("USER_DETAIL") || ""
      ) as CandidateRes;
      setCandidateApp(app.applications);
    }
  }, []);

  if (candidateApp) {
    return (
      <div className="mx-auto max-w-desktop medium:px-0 w-full">
        <div id="jobs" className="my-10 mx-6 medium:mx-15 medium:mt-32.5">
          <div className="my-6 medium:my-10 gap-6 medium:gap-4 flex flex-col">
            {candidateApp?.length &&
              candidateApp.map((dt, idx) => (
                <CandidateAppCard
                  data={dt}
                  key={dt.id}
                  indexcard={idx}
                  componentstyle="FULL"
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center h-screen w-full text-2xl font-bold text-green-800">
          Sorry! You need to login first!
        </div>
      </>
    );
  }
};

// export const getStaticProps: GetStaticProps = async () => {
//   const credentials = Buffer.from(`${clientConfig.apiKey}:`).toString("base64");
//   const response = await fetch(API.v1.candidatesApp, {
//     method: "GET",
//     headers: { Authorization: `Basic ${credentials}` },
//   });

//   let candidateAppResponse: CandidateAppRes[] | [] = [];
//   if (response.ok) {
//     candidateAppResponse = (await response.json()) as CandidateAppRes[];
//   }

//   return {
//     props: {
//       candidateAppResponse,
//     },
//     revalidate: 5,
//   };
// };

export default CandidatesPage;
