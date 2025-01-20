import { AppRoutes } from "../../common/constants";

export default function UserNavBar(): JSX.Element {
  return (
    <nav className="flex justify-between p-4 items-center">
      <span className="flex-1 max-w-[18%]"></span>

      <div className="flex flex-1 justify-between space-x-5">
        <p
          className="cursor-pointer hover:underline hover:text-blue-400"
          onClick={() => (window.location.href = AppRoutes.jobs)}
        >
          Job Opportunities
        </p>
        <p
          className="cursor-pointer hover:underline hover:text-blue-400"
          onClick={() => (window.location.href = AppRoutes.internships)}
        >
          InternShips
        </p>
        <p className="cursor-pointer hover:underline hover:text-blue-400">
          Study Material
        </p>
        <p className="cursor-pointer hover:underline hover:text-blue-400">
          Achievements
        </p>
        <p className="cursor-pointer hover:underline hover:text-blue-400">
          Contacts
        </p>
      </div>

      <div className="flex flex-1 max-w-[18%] justify-end items-center text-sm">
        <p>My Profile</p>
        <i className="ml-2 text-2xl bi bi-person-circle text-themeYellow"></i>
      </div>
    </nav>
  );
}
