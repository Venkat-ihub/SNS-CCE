import { FC } from "react";
import { ButtonStyles, Departments } from "../../common/constants";

interface ApplicationCardParams {
  department: Departments;
  title: string;
  companyName: string;
  location: string;
  description: string;
  applicationLink: string;
  learnMoreLink: string;
}

const ApplicationCard: FC<ApplicationCardParams> = (params) => {
  return (
    <div className="flex flex-1 items-stretch rounded-xl border-[1px] border-gray-600">
      {/* image */}
      <span className="flex-1 bg-gray-300 rounded-tl-xl rounded-bl-xl min-h-[180px]"></span>

      {/* job params */}
      <div className="flex flex-[2] flex-col p-3 justify-between">
        <p className="text-xs mb-3 font-semibold">{params.department}</p>
        <p className="text-xl">{params.title}</p>
        <p className="text-xs mb-3">
          {params.companyName}, {params.location}
        </p>
        <p className="text-xs">{params.description}</p>

        <div className="flex space-x-2 mt-3">
          <button className={`${ButtonStyles.baseButton} bg-[#E7E7E7]`}>
            Learn More
          </button>
          <button className={`${ButtonStyles.themeButton}`}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export { ApplicationCard };
export type { ApplicationCardParams };
