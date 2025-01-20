import { useState } from "react";
import { AppPages, Departments } from "../../components/common/constants";
import {
  ApplicationCard,
  ApplicationCardParams,
} from "../../components/user/common/ApplicationCard";
import UserNavBar from "../../components/user/common/Navbar";
import UserTitleHeader, { HeaderParamScheme } from "../../components/user/common/TitleHeader";
import React from "react";

const jobs: Array<ApplicationCardParams> = [
  {
    department: Departments.ITDevelopment,
    title: "Software Engineer",
    companyName: "Tech Corp",
    location: "Remote",
    description: "Develop and maintain software applications for our platform.",
    applicationLink: "http://example.com/apply1",
    learnMoreLink: "http://example.com/learnMore1",
  },

  {
    department: Departments.Banking,
    title: "Investment Analyst",
    companyName: "FinTech Solutions",
    location: "New York, USA",
    description:
      "Analyze financial data and provide investment recommendations.",
    applicationLink: "http://example.com/apply2",
    learnMoreLink: "http://example.com/learnMore2",
  },

  {
    department: Departments.Biomedical,
    title: "Biomedical Engineer",
    companyName: "HealthTech Inc.",
    location: "London, UK",
    description:
      "Work on innovative solutions for medical devices and equipment.",
    applicationLink: "http://example.com/apply3",
    learnMoreLink: "http://example.com/learnMore3",
  },
];

export const UserJobOpportunitiesContext = React.createContext(null);

function JobOpportunities(): JSX.Element {
  const [filter, setFilter] = useState<string>("All");

  const [filteredJobs, setFilteredJobs] =
    useState<Array<ApplicationCardParams>>(jobs);
  
  const headerParams: HeaderParamScheme = {
    headerFor: AppPages.userJobOpportunities,
    filter: filter,
    setFilter: setFilter
  }

  return (
    <div className="flex flex-col">
      <UserNavBar />
      <UserTitleHeader {...headerParams}/>

      <section className="self-center grid grid-cols-1 lg:grid-cols-2 gap-5 w-3/4 lg:w-[85%]">
        {filteredJobs.map((job) => (
          <ApplicationCard {...job} />
        ))}
      </section>
    </div>
  );
}

export default JobOpportunities;
