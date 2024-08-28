import { CandidateRes } from "@/types/candidateRes";
import type { ReactNode } from "react";
import React, { createContext, useState, useContext } from "react";

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  openDialog: boolean;
  setLoginDialog: (v: boolean) => void;
  candidateRes: CandidateRes | null;
  setCandidateDt: (v: CandidateRes | null) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [candidateRes, setCandidateRes] = useState<CandidateRes | null>(null);

  const setLoginDialog = (v: boolean) => {
    setOpenDialog(v);
  };

  const setCandidateDt = (v: CandidateRes | null) => {
    setCandidateRes(v);
  };

  return (
    <DataContext.Provider
      value={{ openDialog, setLoginDialog, candidateRes, setCandidateDt }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
