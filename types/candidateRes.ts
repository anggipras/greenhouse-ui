export interface CandidateRes {
  id: number;
  first_name: string;
  last_name: string;
  company: any;
  title: string;
  created_at: string;
  updated_at: string;
  last_activity: string;
  is_private: boolean;
  photo_url: any;
  attachments: any[];
  application_ids: number[];
  phone_numbers: PhoneNumber[];
  addresses: any[];
  email_addresses: EmailAddress[];
  website_addresses: WebsiteAddress[];
  social_media_addresses: SocialMediaAddress[];
  recruiter: any;
  coordinator: any;
  can_email: boolean;
  tags: string[];
  applications: Application[];
  educations: any[];
  employments: any[];
  linked_user_ids: any[];
}

interface PhoneNumber {
  value: string;
  type: string;
}

interface EmailAddress {
  value: string;
  type: string;
}

interface WebsiteAddress {
  value: string;
  type: string;
}

interface SocialMediaAddress {
  value: string;
}

interface Application {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string;
  rejected_at: string;
  last_activity_at: string;
  location: any;
  attachments: any[];
  source: any;
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
