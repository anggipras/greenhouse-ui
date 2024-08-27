import API from "@/api/api";
import clientConfig from "@/client.config";
import ApplicationCard from "@/modules/components/applicationCard";
import Button from "@/modules/components/common/button";
import Hero from "@/modules/components/hero";
import { JobsResponse } from "@/types/jobsResponse";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

const HomePage = ({ jobResponse }: { jobResponse: JobsResponse[] | [] }) => {
  const router = useRouter();
  const jbRes = jobResponse.length
    ? (jobResponse as JobsResponse[]).slice(0, 4)
    : [];
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const credentials = Buffer.from(`${clientConfig.apiKey}:`).toString("base64");
  const response = await fetch(API.v1.jobs, {
    method: "GET",
    headers: { Authorization: `Basic ${credentials}` },
  });

  let jobResponse: JobsResponse[] | [] = [];
  if (response.ok) {
    jobResponse = (await response.json()) as JobsResponse[];
  }

  return {
    props: {
      jobResponse,
    },
    revalidate: 5,
  };
};

export default HomePage;
