import images from "@/assets/Images";
import ScreenNotice from "@/components/ScreenNotice";
import {
  AvatarIcon,
  DashboardIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
// import path from "path";
import { ReactNode } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}
const navLinks = [
  {
    path: "/back-office",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/back-office/all-addresses",
    title: "All Addresses",
    icon: <ReaderIcon />,
  },
  {
    path: "/back-office/all-agents",
    title: "All Agents",
    icon: <AvatarIcon />,
  },
  {
    path: "/back-office/all-chats",
    title: "Support",
    icon: <ReaderIcon />
  }
];

export default function DashboardLayout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('adminToken');
    navigate('/auth/back-office/login')
  }

  return (
    <>
      <div className="small-screen-notice">
        <ScreenNotice />
      </div>
      <div className="flex h-screen overflow-hidden">
        <div className="w-[250px] border-r-[1px] border-stroke-clr bg-white h-full">
          <div className="h-[70px] flex items-center justify-center border-b-[1px] border-stroke-clr">
            <img src={images.logo} alt="Vettme" className="h-8" />
          </div>

          <div className="px-5 h-[calc(100%-70px)] flex flex-col justify-between">
            <div className="mt-10">
            {navLinks.map((link, idx) => (
              <NavLink
                to={link.path}
                key={idx}
                className="nav-link flex items-center gap-3 mb-2 px-5 py-3 rounded-lg"
              >
                <span className="flex nav-icon">{link.icon}</span>
                <p className="text-sm">{link.title}</p>
              </NavLink>
            ))}
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 mb-3 px-5 py-4 rounded-lg text-destructive logout_btn"
            >
              <span><RiLogoutCircleLine /></span>
              <p className="text-sm">Log out</p>
            </button>
          </div>
        </div>

        <div className="flex-1 h-screen overflow-y-scroll">
          <div className="w-full bg-white h-[70px] flex items-center justify-end px-[30px] gap-2 border-b-[1px] border-stroke-clr">
              <span className="w-[40px] h-[40px] rounded-full grid place-items-center text-white border-[1px] bg-blue-400">
                {'Admin'.slice(0, 2).toUpperCase()}
              </span>
              <hr className="h-7 w-[1px] bg-stroke-clr" />
              <p className="font-medium">User: <span className="text-blue-400">Admin</span></p>
          </div>
          <div className="w-full overflow-y-scroll p-[30px]">{children}</div>
        </div>
      </div>
    </>
  );
}
