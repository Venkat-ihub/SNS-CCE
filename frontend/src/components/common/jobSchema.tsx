import { Departments } from "./constants";

interface JobSchema {
  title: string;
  department: Departments;
  category: string;
  vacancies: number;
  location: string;
  job_type: string;
  end_date: string;
  description: string;
  eligibility: string;
  selection_process: string;
  pay_scale: string;
  application_link: string;
  notification_pdf: string;
}

export default JobSchema;
