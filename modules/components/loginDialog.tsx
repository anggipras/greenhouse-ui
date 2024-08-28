import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { CandidateRes } from "@/types/candidateRes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import Button from "./common/button";
import { useData } from "@/lib/hooks/use-data-context";

export interface LoginDialogProps {
  data: CandidateRes[] | [];
}

const LoginDialog = (props: LoginDialogProps) => {
  const { data } = props;
  const [userData, setUserdata] = useState<CandidateRes | null>(null);
  const [userDataLabel, setUserdataLabel] = useState<string>("");
  const { openDialog, setLoginDialog, setCandidateDt } = useData();

  const handleSelectChange = (dt: CandidateRes) => {
    setUserdata(dt);
  };

  const handelClose = () => {
    setLoginDialog(false);
  };

  const submitUserData = () => {
    localStorage.setItem("USER_DETAIL", JSON.stringify(userData));
    setLoginDialog(false);
    setCandidateDt(userData);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUserdataLabel(event.target.value);
  };

  return (
    <Dialog onClose={handelClose} open={openDialog}>
      <div className="p-6 flex flex-col justify-center items-center">
        <div className="w-[300px] h-auto">
          <Image
            alt="logo"
            className="w-full h-full"
            height="0"
            sizes="100%"
            src={require("@/assets/images/logo.svg")}
            width="0"
          />
        </div>
        <div className="text-green-800 text-2xl">Login</div>
        <Box
          sx={{
            minWidth: 500,
            minHeight: 500,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose your user
            </InputLabel>
            <Select
              value={userDataLabel}
              defaultValue=""
              label="Choose your user"
              onChange={handleChange}
            >
              {data.map((dt) => (
                <MenuItem
                  key={dt.id}
                  value={dt.id}
                  onClick={() => handleSelectChange(dt)}
                >
                  {dt.first_name} {dt.last_name} - {dt.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-4">
            <Button
              size="small"
              width="w-full"
              variant="SECONDARY"
              disabled={!userData}
              onClick={() => submitUserData()}
            >
              Login
            </Button>
          </div>
        </Box>
      </div>
    </Dialog>
  );
};

export default LoginDialog;
