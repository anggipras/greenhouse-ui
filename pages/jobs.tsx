import API from "@/api/api";
import clientConfig from "@/client.config";
import ApplicationCard from "@/modules/components/applicationCard";
import { JobsResponse } from "@/types/jobsResponse";
import type { GetStaticProps } from "next";
import React from "react";

const JobsPage = ({ jobResponse }: { jobResponse: JobsResponse[] | [] }) => {
  return (
    <div className="mx-auto max-w-desktop medium:px-0 w-full">
      <div id="jobs" className="my-10 mx-6 medium:mx-15 medium:mt-32.5">
        <div className="my-6 medium:my-10 gap-6 medium:gap-4 grid medium:grid-cols-2">
          {jobResponse.length &&
            jobResponse.map((dt, idx) => (
              <ApplicationCard data={dt} key={dt.id} indexcard={idx} />
            ))}
        </div>
      </div>
    </div>
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

export default JobsPage;
