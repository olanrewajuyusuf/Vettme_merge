import AllCompanies from "../components/dashboard/AllCompanies";
import DashboardCards from "../components/dashboard/cards";

const BackOfficeDashboard = () => {

  return (
    <div className="pb-10">
      <div>
          <h1 className="font-normal">All Registered Companies</h1>
          <p className="mb-10">Manage all Companies information here.</p>
      </div>
      <DashboardCards />
      <AllCompanies />
    </div>
  )
}

export default BackOfficeDashboard
