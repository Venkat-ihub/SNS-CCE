import { useEffect, useState } from "react";
import { AppPages, Departments } from "../../components/common/constants";
import {
  ApplicationCard,
  ApplicationCardParams,
} from "../../components/user/common/ApplicationCard";
import UserNavBar from "../../components/user/common/Navbar";
import UserTitleHeader, {
  HeaderParamScheme,
} from "../../components/user/common/TitleHeader";

const interns: ApplicationCardParams[] = [
  {
    department: Departments.ITDevelopment,
    title: "Frontend Developer Intern",
    companyName: "Tech Innovators",
    location: "Remote",
    description:
      "Assist in building and maintaining user-facing web applications using React and Tailwind CSS.",
    applicationLink: "http://example.com/apply-frontend-intern",
    learnMoreLink: "http://example.com/learn-more-frontend-intern",
  },
  {
    department: Departments.Banking,
    title: "Finance Analyst Intern",
    companyName: "FinBank Ltd.",
    location: "New York, USA",
    description:
      "Analyze financial trends and prepare reports for internal stakeholders.",
    applicationLink: "http://example.com/apply-finance-intern",
    learnMoreLink: "http://example.com/learn-more-finance-intern",
  },
  {
    department: Departments.Biomedical,
    title: "Biomedical Research Intern",
    companyName: "HealthTech Labs",
    location: "Boston, USA",
    description:
      "Support ongoing research projects focused on medical device innovation and testing.",
    applicationLink: "http://example.com/apply-biomedical-intern",
    learnMoreLink: "http://example.com/learn-more-biomedical-intern",
  },
  {
    department: Departments.Civil,
    title: "Civil Engineering Intern",
    companyName: "BuildPro Inc.",
    location: "Los Angeles, USA",
    description:
      "Collaborate with senior engineers on infrastructure design and construction management.",
    applicationLink: "http://example.com/apply-civil-intern",
    learnMoreLink: "http://example.com/learn-more-civil-intern",
  },
  {
    department: Departments.UPSC,
    title: "Policy Analyst Intern",
    companyName: "Government Policy Institute",
    location: "New Delhi, India",
    description:
      "Assist in researching and drafting public policy documents for ongoing government projects.",
    applicationLink: "http://example.com/apply-policy-intern",
    learnMoreLink: "http://example.com/learn-more-policy-intern",
  },
];

function InternOpportunities(): JSX.Element {
  const [filter, setFilter] = useState<string>("All");

  const [filteredInterns, setFilteredInterns] =
    useState<Array<ApplicationCardParams>>(interns);

  const filterInternsByDepartment = (category: Departments | string) => {
    if (category === "All") {
      setFilteredInterns(interns);
    } else
      setFilteredInterns(
        interns.filter((intern) => intern.department === category)
      );
  };

  useEffect(() => filterInternsByDepartment(filter), [filter]);

  const headerParams: HeaderParamScheme = {
    headerFor: AppPages.userInternshipOpportunities,
    filter: filter,
    setFilter: setFilter,
  };

  return (
    <div className="flex flex-col">
      <UserNavBar />
      <UserTitleHeader {...headerParams} />

      {filteredInterns.length === 0 && (
        <p className="self-center text-lg"> !! No Internship Opportunites available for this Category !! </p>
      )}

      <section className="self-center grid grid-cols-1 lg:grid-cols-2 gap-5 w-3/4 lg:w-[85%]">
        {filteredInterns.map((intern) => (
          <ApplicationCard {...intern} />
        ))}
      </section>
    </div>
  );
}

export default InternOpportunities;
