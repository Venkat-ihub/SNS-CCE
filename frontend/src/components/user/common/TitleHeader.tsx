import { AppPages, Departments } from "../../common/constants";

interface HeaderParamScheme {
  headerFor: AppPages,
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>,
}

export type { HeaderParamScheme };

const UserTitleHeader: React.FC<HeaderParamScheme> = (headerParams) => {
  return (
    <header className="flex flex-col items-center justify-center py-14 container self-center">
      <p className="text-5xl letter">
        {headerParams.headerFor === AppPages.userJobOpportunities
          ? "Job Opportunities"
          : "Internships"}
      </p>
      <p className="text-xs my-2">
        Explore all the{" "}
        {headerParams.headerFor === AppPages.userJobOpportunities
          ? "Job Opportunities"
          : "Internships"}{" "}
        in all the existing fields around the globe.
      </p>
      <div className="flex space-x-2 flex-wrap w-[50%] justify-center">
        {["All", ...Object.values(Departments)].map(
          (department): JSX.Element => (
            <p
              className={`${
                headerParams.filter === department
                  ? "bg-[#000000] text-white"
                  : ""
              } border-gray-700 border-[1px] py-1 px-[10px] rounded-full text-xs my-1 cursor-pointer`}
              onClick={() => headerParams.setFilter(department)}
            >
              {department}
            </p>
          )
        )}
      </div>
    </header>
  );
};

export default UserTitleHeader;
