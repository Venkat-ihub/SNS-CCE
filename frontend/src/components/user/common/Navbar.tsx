export default function UserNavBar(): JSX.Element {
    return <nav className="flex justify-between p-4 items-center">
        <span className="flex-1 max-w-[18%]">

        </span>

        <div className="flex flex-1 justify-between space-x-5">
            <p>Job Opportunities</p>
            <p>InternShips</p>
            <p>Study Material</p>
            <p>Achievements</p>
            <p>Contacts</p>
        </div>

        <div className="flex flex-1 max-w-[18%] justify-end items-center text-sm">
            <p>My Profile</p>
            <i className="ml-2 text-2xl bi bi-person-circle text-themeYellow"></i>
        </div>
    </nav>
}