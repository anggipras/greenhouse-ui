export interface CandidateAppRes {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string;
  rejected_at: string;
  last_activity_at: string;
  location: any;
  attachments: any[];
  source: Source;
  credited_to: any;
  rejection_reason: RejectionReason;
  rejection_details: RejectionDetails;
  jobs: Job[];
  job_post_id: any;
  status: string;
  current_stage: CurrentStage;
  answers: any[];
  prospective_department: any;
  prospective_office: any;
  prospect_detail: ProspectDetail;
}

interface Source {
  id: number;
  public_name: string;
}

interface RejectionReason {
  id: number;
  name: string;
  type: Type;
}

interface Type {
  id: number;
  name: string;
}

interface RejectionDetails {}

interface Job {
  id: number;
  name: string;
}

interface CurrentStage {
  id: number;
  name: string;
}

interface ProspectDetail {
  prospect_pool: any;
  prospect_stage: any;
  prospect_owner: any;
}
