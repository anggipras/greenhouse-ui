import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { CandidateRes } from "@/types/candidateRes";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "./common/button";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { JobsResponse } from "@/types/jobsResponse";
import Swal from "sweetalert2";
import clientConfig from "@/client.config";

export interface SubmitAppDialogProps {
  open: boolean;
  job?: JobsResponse;
  onClose: () => void;
}

const SubmitAppDialog = (props: SubmitAppDialogProps) => {
  const { onClose, job, open } = props;
  const [userData, setUserdata] = useState<CandidateRes | null>();
  const [enableSubmission, setEnableSubmission] = useState<boolean>(false);

  useEffect(() => {
    setUserdata(
      localStorage.getItem("USER_DETAIL")
        ? JSON.parse(localStorage.getItem("USER_DETAIL") || "")
        : null
    );
  }, []);

  const handelClose = () => {
    onClose();
  };

  const submitUserApp = async () => {
    setEnableSubmission(false);
    if (userData?.id && job?.id) {
      const bodyApp = { job_id: job.id };
      const response = await fetch(
        `/api/v1/candidates/${userData.id}/applications`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${clientConfig.apiKey}:`
            ).toString("base64")}`,
            "On-Behalf-Of": "4117007007",
          },
          body: JSON.stringify(bodyApp),
        }
      );
      onClose();
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
    }
  };

  return (
    <Dialog onClose={handelClose} open={open}>
      <div className="p-6 flex flex-col justify-center items-center">
        <div className="text-green-800 text-2xl font-bold mb-4">
          {job?.name}
        </div>
        <Box
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {userData && (
            <FormControl
              fullWidth
              sx={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <TextField
                disabled
                defaultValue={userData.first_name}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
              />
              <TextField
                disabled
                defaultValue={userData.last_name}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
              />
              <TextField
                disabled
                defaultValue={job?.name}
                id="outlined-basic"
                label="Applied Position"
                variant="outlined"
              />
            </FormControl>
          )}
          <div className="mt-24">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setEnableSubmission(!enableSubmission)}
                  color="success"
                />
              }
              label="I have confirmed that above information is correct"
            />
            <Button
              size="small"
              width="w-full"
              variant="SECONDARY"
              disabled={!enableSubmission}
              onClick={() => submitUserApp()}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </Dialog>
  );
};

export default SubmitAppDialog;
