import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Button from "./common/button";
import { convertISOStringToCustomFormat } from "@/lib/utils/date";
import { useRouter } from "next/router";
import { useIntersectionObs } from "@/lib/hooks/use-intersection-obs";
import { JobsResponse } from "@/types/jobsResponse";
import clientConfig from "@/client.config";
import { formatNumberCurrency } from "@/lib/utils/formatNumber";
import { HomeWork } from "@mui/icons-material";
import Swal from "sweetalert2";

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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmitApp = async (jobId: number) => {
    const credentials = Buffer.from(`${clientConfig.apiKey}:`).toString(
      "base64"
    );
    const bodyApp = { job_id: jobId };
    const response = await fetch(
      `/api/v1/candidates/${8044287007}/applications`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "On-Behalf-Of": "4117007007",
        },
        body: JSON.stringify(bodyApp),
      }
    );
    if (response.ok) {
      Swal.fire({
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        title: "Your application has successfully submitted",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have submitted for this application",
      });
    }
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
    <div
      className={clsx(
        "cursor-pointer hover:shadow-md flex flex-col justify-between items-center gap-6 medium:gap-0 p-6 medium:px-10 medium:py-6 rounded-xl bg-green-100 w-full opacity-0 translate-x-[1rem]",
        compFlex
      )}
      ref={cardRef}
    >
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="typo-h5">{data.name}</div>
          {data.custom_fields.salary_range?.unit && (
            <div className="flex">
              <div className="typo-h6">
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
        <div className="text-gray-500 my-2">{data.notes}</div>
        <div className="flex gap-2 items-center mt-8">
          <HomeWork />
          <div>{data.offices[0].name}</div>
        </div>
      </div>
      <hr className="w-full my-2 bg-gray-300 h-0.5" />
      <div className="flex justify-between items-center w-full">
        <div className="typo-copy-normal text-lime-800">
          {convertISOStringToCustomFormat(data.created_at)}
        </div>
        <Button
          size="small"
          variant="PRIMARY"
          onClick={() => onSubmitApp(data.id)}
        >
          <span className="">Apply</span>
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;
