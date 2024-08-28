/* eslint-disable react-hooks/exhaustive-deps */
import API from "@/api/api";
import clientConfig from "@/client.config";
import { useData } from "@/lib/hooks/use-data-context";
import ApplicationCard from "@/modules/components/applicationCard";
import Button from "@/modules/components/common/button";
import Hero from "@/modules/components/hero";
import LoginDialog from "@/modules/components/loginDialog";
import { CandidateRes } from "@/types/candidateRes";
import { JobsResponse } from "@/types/jobsResponse";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HomePage = ({
  jobResponse,
  candidateResponse,
}: {
  jobResponse: JobsResponse[] | [];
  candidateResponse: CandidateRes[] | [];
}) => {
  const router = useRouter();
  const jbRes = jobResponse.length
    ? (jobResponse as JobsResponse[]).slice(0, 4)
    : [];

  const { setLoginDialog } = useData();

  useEffect(() => {
    if (!localStorage.getItem("USER_DETAIL")) {
      setLoginDialog(true);
    }
  }, []);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-desktop medium:px-0 w-full">
        <div id="jobs" className="my-10 mx-6 medium:mx-15 medium:mt-32.5">
          <div className="my-6 medium:my-10 gap-6 medium:gap-4 grid medium:grid-cols-2">
            {jbRes.length &&
              jbRes.map((dt, idx) => (
                <ApplicationCard data={dt} key={dt.id} indexcard={idx} />
              ))}
          </div>
          <div className="flex justify-center w-full">
            <Button
              variant="SECONDARY"
              onClick={() => void router.push("/jobs")}
            >
              See All
            </Button>
          </div>
        </div>
      </div>
      <LoginDialog data={candidateResponse} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const credentials = Buffer.from(`${clientConfig.apiKey}:`).toString("base64");
  const candidateRes = await fetch(API.v1.candidatesList, {
    method: "GET",
    headers: { Authorization: `Basic ${credentials}` },
  });
  const jobRes = await fetch(API.v1.jobs, {
    method: "GET",
    headers: { Authorization: `Basic ${credentials}` },
  });

  let jobResponse: JobsResponse[] | [] = [];
  let candidateResponse: CandidateRes[] | [] = [];
  if (jobRes.ok) {
    jobResponse = (await jobRes.json()) as JobsResponse[];
  }
  if (candidateRes.ok) {
    candidateResponse = (await candidateRes.json()) as CandidateRes[];
  }

  return {
    props: {
      jobResponse,
      candidateResponse,
    },
    revalidate: 5,
  };
};

export default HomePage;
