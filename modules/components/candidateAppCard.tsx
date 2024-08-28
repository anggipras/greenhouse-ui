import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { convertISOStringToCustomFormat } from "@/lib/utils/date";
import { useIntersectionObs } from "@/lib/hooks/use-intersection-obs";
import { CandidateAppRes } from "@/types/candidateAppRes";
import { AddTask, Autorenew } from "@mui/icons-material";

interface AppCardProps {
  data: CandidateAppRes;
  componentstyle?: "FULL" | "GRID";
  indexcard: number;
}

const CandidateAppCard = ({
  data,
  componentstyle = "GRID",
  ...props
}: AppCardProps) => {
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
        "cursor-pointer bg-gray-50 hover:shadow-xl flex flex-col border justify-between items-center gap-6 medium:gap-0 p-6 medium:px-10 medium:py-6 rounded-3xl w-full opacity-0 translate-x-[1rem]",
        compFlex
      )}
      ref={cardRef}
    >
      <div className="w-full">
        <div className="typo-h2 rounded-sm w-fit">{data.jobs[0]?.name}</div>
        <div className="flex gap-6 items-center mt-2">
          <div
            className={clsx(
              "flex gap-1 items-center p-2 rounded-md",
              data.status === "rejected" ? "bg-red-300" : "bg-green-300"
            )}
          >
            <Autorenew />
            <div>{data.status}</div>
          </div>
          <div className="flex gap-1 items-center">
            <AddTask />
            <div>{data.current_stage.name}</div>
          </div>
        </div>
        <hr className="w-full my-2 bg-black h-0.5 mt-8" />
        <div className="typo-copy-normal text-gray-700">
          Applied Date: {convertISOStringToCustomFormat(data.applied_at)}
        </div>
      </div>
    </div>
  );
};

export default CandidateAppCard;
