import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Button from "./common/button";
import { convertISOStringToCustomFormat } from "@/lib/utils/date";
import { useRouter } from "next/router";
import { useIntersectionObs } from "@/lib/hooks/use-intersection-obs";
import { JobsResponse } from "@/types/jobsResponse";
import { formatNumberCurrency } from "@/lib/utils/formatNumber";
import { HomeWork, Payments } from "@mui/icons-material";
import SubmitAppDialog from "./submitAppDialog";

interface AppCardProps {
  data: JobsResponse;
  componentstyle?: "FULL" | "GRID";
  indexcard: number;
}

const ApplicationCard = ({
  data,
  componentstyle = "GRID",
  ...props
}: AppCardProps) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObs(cardRef);
  const [screenWidth, setScreenWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState<JobsResponse>();
  const [activeUser, setActiveUser] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setActiveUser(Boolean(localStorage.getItem("USER_DETAIL")));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openSubmitAppDialog = (dt: JobsResponse) => {
    setJob(dt);
    setOpen(true);
  };

  if (isIntersecting) {
    if (componentstyle === "GRID") {
      if (screenWidth > 1279) {
        const groupIndex = Math.floor(props.indexcard / 2);
        const baseValue = groupIndex * 2;
        const resultIdx = props.indexcard - baseValue;
        setTimeout(() => {
          cardRef.current?.classList.remove("translate-x-[1rem]", "opacity-0");
          cardRef.current?.classList.add(
            "translate-x-0",
            "opacity-100",
            "duration-500"
          );
        }, resultIdx * 500);
      } else {
        cardRef.current?.classList.remove("translate-x-[1rem]", "opacity-0");
        cardRef.current?.classList.add(
          "translate-x-0",
          "opacity-100",
          "duration-500"
        );
      }
    } else {
      cardRef.current?.classList.remove("translate-x-[1rem]", "opacity-0");
      cardRef.current?.classList.add(
        "translate-x-0",
        "opacity-100",
        "duration-500"
      );
    }
  }

  const compFlex = clsx({
    "medium:flex-row": componentstyle === "FULL",
    "medium:flex-col": componentstyle === "GRID",
  });

  return (
    <>
      <div
        className={clsx(
          "cursor-pointer hover:shadow-md flex flex-col justify-between items-center gap-6 medium:gap-0 p-6 medium:px-10 medium:py-6 rounded-xl bg-green-100 w-full opacity-0 translate-x-[1rem]",
          compFlex
        )}
        ref={cardRef}
      >
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="typo-h4 font-bold">{data.name}</div>
            {data.custom_fields.salary_range?.unit && (
              <div className="flex">
                <Payments />
                <div className="ml-1 typo-h6">
                  {data.custom_fields.salary_range?.unit}{" "}
                  {formatNumberCurrency(
                    data.custom_fields.salary_range?.min_value
                  )}{" "}
                  -{" "}
                  {formatNumberCurrency(
                    data.custom_fields.salary_range?.max_value
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={clsx(
              "flex gap-3 my-2",
              data.custom_fields.employment_type ? "visible" : "invisible"
            )}
          >
            <div className="rounded-lg bg-lime-400 p-2">
              {data.custom_fields.employment_type}
            </div>
          </div>
          <div className="text-gray-500 my-2">
            We are looking for a skilled {data.name} to join our dynamic{" "}
            {data.departments[0].name} Department, where you`ll play a key role
            in driving our operational standards, policies, procedures and
            engagement strategies.
          </div>
          <div className="flex gap-2 items-center mt-8">
            <HomeWork />
            <div>{data.offices[0].name}</div>
          </div>
        </div>
        <hr className="w-full my-2 bg-gray-300 h-0.5" />
        <div className="flex justify-between items-center w-full">
          <div className="typo-copy-normal text-lime-800">
            Last Updated at: {convertISOStringToCustomFormat(data.created_at)}
          </div>
          {activeUser && (
            <Button
              size="small"
              variant="PRIMARY"
              onClick={() => openSubmitAppDialog(data)}
            >
              <span className="">Apply Now!</span>
            </Button>
          )}
        </div>
      </div>
      <SubmitAppDialog job={job} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ApplicationCard;
