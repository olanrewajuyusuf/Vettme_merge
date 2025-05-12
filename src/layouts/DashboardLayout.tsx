import images from "@/assets/Images";
import ScreenNotice from "@/components/ScreenNotice";
import { IoMdNotificationsOutline } from "react-icons/io"
import { NavSkeleton } from "@/components/SkeletonUi";
import { useUser } from "@/utils/context/useUser";
import {
  AvatarIcon,
  CardStackIcon,
  ChatBubbleIcon,
  DashboardIcon,
  // ReaderIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useNotification } from "@/utils/context/useNotification";
import { FaCode, FaLaptopCode, FaPlusCircle } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { IoMedal } from "react-icons/io5";
import TopupModal from "@/components/modals/TopupModal";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { FaBarsProgress, FaCodeCompare } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { AiFillProduct, AiOutlineFileProtect, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GoProjectRoadmap } from "react-icons/go";
import { SiWelcometothejungle } from "react-icons/si";

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  {
    path: "/",
    title: "Welcome!",
    icon: <SiWelcometothejungle />,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    id: "overview-tab",
  },
  {
    title: "Vettme Basic",
    icon: <FaBarsProgress />,
    subTab1: {
      path: "/basic/overview",
      title: "Overview",
      icon: <AiFillProduct />,
    },
    subTab2: {
      path: "/basic/verifications",
      title: "Vett",
      icon: <GoProjectRoadmap />,
    }
  },
  {
    title: "Vettme Pro",
    icon: <GiProgression />,
    subTab1: {
      path: "/pro/overview",
      title: "Overview",
      icon: <AiOutlineFundProjectionScreen />,
    },
    subTab2: {
      path: "/pro/verifications",
      title: "Verifications",
      icon: <AiOutlineFileProtect />,
    }
  },
  {
    title: "Vettme API",
    icon: <FaLaptopCode />,
    subTab1: {
      path: "/api/overview",
      title: "Overview",
      icon: <FaCodeCompare />,
    },
    subTab2: {
      path: "/api/applications",
      title: "Applications",
      icon: <FaCode />,
    }
  },
  {
    path: "/wallet",
    title: "Wallet",
    icon: <CardStackIcon />,
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: <SpeakerModerateIcon />,
  },
  {
    path: "/support",
    title: "Support",
    icon: <ChatBubbleIcon />,
  },
  {
    path: "/account",
    title: "Account",
    icon: <AvatarIcon />,
  },
];

// Initial load from sessionStorage
const getInitialOpenMenus = () => {
  const stored = sessionStorage.getItem("sidebarOpenMenus");
  return stored ? JSON.parse(stored) : {};
};

export default function DashboardLayout({ children }: LayoutProps) {
  const { company, balance } = useUser();
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  // const [toggleArrow, setToggleArrow] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>(getInitialOpenMenus);
  const { unreadCount } = useNotification();
  const navigate = useNavigate(); 
  const location = useLocation();

  const toggleMenu = (menuTitle: string) => {
    setOpenMenus((prev) => {
      const updated = { ...prev, [menuTitle]: !prev[menuTitle] };
      sessionStorage.setItem("sidebarOpenMenus", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    // Ensure sessionStorage sync when user first mounts the component
    sessionStorage.setItem("sidebarOpenMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  const isSubTabActive = (subTab1?: any, subTab2?: any) => {
    return (
      (subTab1 && location.pathname.startsWith(subTab1.path)) ||
      (subTab2 && location.pathname.startsWith(subTab2.path))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/auth/login')
  }

  return (
    <>
      <div className="small-screen-notice">
        <ScreenNotice />
      </div>
      {<TopupModal isOpen={topupModalOpen} setIsOpen={setTopupModalOpen} />}
      <div className="flex h-screen overflow-hidden">
        <div className="w-[250px] border-r-[1px] border-stroke-clr bg-white h-full">
          <div className="h-[70px] flex items-center justify-center border-b-[1px] border-stroke-clr">
            <img src={images.logo} alt="Vettme" className="h-8" />
          </div>

          <div id="sidebar" className="px-5 h-[calc(100%-70px)] flex flex-col justify-between overflow-scroll">
            <div className="mt-6">
              {navLinks.map((link, idx) => {
                const hasSubTabs = link.subTab1 || link.subTab2;
                const isOpen = !!openMenus[link.title];
                const isActive = isSubTabActive(link) || location.pathname === link.path;

                return (
                  <div key={idx} className="mb-2">
                    {hasSubTabs ? (
                      <>
                        <NavLink
                          to="#"
                          onClick={() => toggleMenu(link.title)}
                          className={() =>
                            `flex justify-between items-center px-5 py-3 rounded-lg cursor-pointer ${
                              isActive ? "active" : "hover"
                            }`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span
                            >{link.icon}</span>
                            <p className="text-sm">{link.title}</p>
                          </div>
                          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </NavLink>

                        {isOpen && (
                          <div className="ml-8 mt-2 space-y-1">
                            {link.subTab1 && (
                              <NavLink
                                to={link.subTab1.path}
                                className={({ isActive }) =>
                                  `block text-sm px-4 py-2 rounded-md ${
                                    isActive
                                      ? "text-blue-600 font-medium bg-blue-50 shadow-sm shadow-blue-400"
                                      : "text-gray-600 hover:bg-gray-50"
                                  }`
                                }
                              >
                                <span className="flex items-center gap-2">{link.subTab1.icon} {link.subTab1.title}</span>
                              </NavLink>
                            )}
                            {link.subTab2 && (
                              <NavLink
                                to={link.subTab2.path}
                                className={({ isActive }) =>
                                  `block text-sm px-4 py-2 rounded-md ${
                                    isActive
                                      ? "text-blue-600 font-medium bg-blue-50 shadow-sm shadow-blue-400"
                                      : "text-gray-600 hover:bg-gray-50"
                                  }`
                                }
                              >
                                <span className="flex items-center gap-2">{link.subTab2.icon} {link.subTab2.title}</span>
                              </NavLink>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        id={link.id}
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-5 py-3 rounded-lg ${
                            isActive
                              ? "active text-blue-800"
                              : "hover"
                          }`
                        }
                      >
                        <span>{link.icon}</span>
                        <p className="text-sm">{link.title}</p>
                      </NavLink>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 mb-3 px-5 py-3 rounded-lg text-destructive logout_btn"
            >
              <span><RiLogoutCircleLine /></span>
              <p className="text-sm">Log out</p>
            </button>
          </div>
        </div>

        <div className="flex-1 h-screen overflow-y-scroll">
          {!company && <NavSkeleton/>}
          {company && (
            <div className="w-full bg-white h-[70px] flex items-center justify-between px-[30px] border-b-[1px] border-stroke-clr">
              <div className="flex items-center justify-end gap-2">
                  <h1 className="font-light">Hi, {company?.companyName}</h1>
              </div>
              <div className="flex items-center justify-end gap-2 bg-stroke-clr px-5 py-1 rounded-full">
                  <HiIdentification />
                  <hr className="h-3 w-[1px] bg-white" />
                  <p className="font-medium text-blue-500">{company?.companyId}</p>
                  <IoMedal className="text-orange-500"/>
              </div>
            <div className="flex items-center gap-1">
              <div 
              onClick={() => setTopupModalOpen(true)}
              className="bg-green-600 rounded-full px-2 py-0 h-7 flex items-center overflow-hidden"
              >
                <span className="text-white text-sm"><MdAccountBalanceWallet /></span>
                <span className="text-white text-sm mx-1">{balance.toLocaleString()}</span>
                <FaPlusCircle 
                className="text-white text-lg ml-2 cursor-pointer"
                />
              </div>
              <div id="notification-button" className="relative cursor-pointer" onClick={()=>navigate('/notifications')} >
                <IoMdNotificationsOutline className="text-2xl"/>
                {(unreadCount !== 0) && <div 
                className="absolute top-0 -right-1 w-4 h-4 bg-destructive rounded-full text-white text-xs grid place-items-center"
                >
                {unreadCount}
                </div>}
              </div>
              <span 
              id="profile-button" 
              onClick={()=>navigate('/account')}
              className="w-[35px] h-[35px] rounded-full grid place-items-center text-white text-sm border-[1px] border-blue-700 ml-2 bg-blue-400 cursor-pointer"
              >
                {company?.companyName.slice(0, 2).toUpperCase()}
              </span>
                {/* <Popover>
                  <PopoverTrigger>
                    <div 
                    onClick={()=> setToggleArrow(!toggleArrow)}
                    className="hover:shadow-md cursor-pointer rounded-md flex items-start gap-1 p-2 ml-2"
                    >
                      <span className="w-[35px] h-[35px] rounded-full grid place-items-center text-white border-[1px] bg-blue-400">
                          {company?.companyName.slice(0, 2).toUpperCase()}
                      </span>
                      {toggleArrow && <ChevronUp className="text-blue-500 w-5" />}
                      {!toggleArrow && <ChevronDown className="text-blue-500 w-5" />}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white p-5 shadow-lg rounded-md mr-5 text-sm text-gray-600">
                    <h3 className="border-b-[1px] border-stroke-clr pb-2 mb-2 text-black">My Account</h3>
                    <span 
                    onClick={() => navigate('/auth/register')}
                    className="flex items-center gap-1 hover:text-black cursor-pointer"
                    >
                      <PlusIcon className="w-4"/> Create another account
                    </span>
                  </PopoverContent>
                </Popover> */}
              </div>
            </div>)}
          <div className="w-full overflow-y-scroll p-[30px]">{children}</div>
        </div>
      </div>
    </>
  );
}
