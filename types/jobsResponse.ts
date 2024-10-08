export interface JobsResponse {
  id: number;
  name: string;
  requisition_id: string;
  notes: any;
  confidential: boolean;
  is_template: any;
  copied_from_id: any;
  status: string;
  created_at: string;
  opened_at: string;
  closed_at: any;
  updated_at: string;
  departments: Department[];
  offices: Office[];
  hiring_team: HiringTeam;
  openings: Opening[];
  custom_fields: CustomFields;
  keyed_custom_fields: KeyedCustomFields;
}

interface Department {
  id: number;
  name: string;
  parent_id: any;
  parent_department_external_id: any;
  child_ids: any[];
  child_department_external_ids: any[];
  external_id: any;
}

interface Office {
  id: number;
  name: string;
  location: Location;
  primary_contact_user_id: any;
  parent_id: any;
  parent_office_external_id: any;
  child_ids: any[];
  child_office_external_ids: any[];
  external_id: any;
}

interface Location {
  name: any;
}

interface HiringTeam {
  hiring_managers: any[];
  recruiters: any[];
  coordinators: any[];
  sourcers: any[];
}

interface Opening {
  id: number;
  opening_id?: string;
  status: string;
  opened_at: string;
  closed_at?: string;
  application_id?: number;
  close_reason?: CloseReason;
}

interface CloseReason {
  id: number;
  name: string;
}

interface CustomFields {
  employment_type: string;
  salary_range: SalaryRange;
}

interface SalaryRange {
  min_value: string;
  max_value: string;
  unit: string;
}

interface KeyedCustomFields {
  employment_type: EmploymentType;
  salary_range: SalaryRange2;
}

interface EmploymentType {
  name: string;
  type: string;
  value: string;
}

interface SalaryRange2 {
  name: string;
  type: string;
  value: Value;
}

interface Value {
  min_value: string;
  max_value: string;
  unit: string;
}
