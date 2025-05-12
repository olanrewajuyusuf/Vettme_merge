import images from "@/assets/Images";
import Loader from "@/components/Loader";
import { ReactNode, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  {
    title: "General",
    paths: [
      { title: "Introduction", path: "/api-docs" },
      { title: "Keywords", path: "/api-docs/keywords" },
    ],
  },
  {
    title: "Authentication",
    paths: [
      { title: "Application ID", path: "/api-docs/app_id" },
      { title: "API Key", path: "/api-docs/api_key" },
    ],
  },
  {
    title: "Environments",
    paths: [
      { title: "Sandbox", path: "/api-docs/sandbox" },
      { title: "Live", path: "/api-docs/live" },
    ],
  },
  {
    title: "Services",
    paths: [
      { title: "BVN", path: "/api-docs/bvn" },
      { title: "NIN", path: "/api-docs/nin" },
      { title: "Phone Number", path: "/api-docs/phone_number" },
      { title: "Account Number", path: "/api-docs/account_number" },
      { title: "Voter's ID", path: "/api-docs/vin" },
    ],
  },
];

export default function APIDocLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="h-screen overflow-hidden">
      {/* Header */}
      <header className="w-full h-16 flex items-center justify-between border-b border-gray-200 px-6">
        <img src={images.logo} alt="Vettme" className="w-full max-w-[80px]" />
        <Link to="/">
          <Button className="pry-btn">Dashboard</Button>
        </Link>
      </header>

      {/* Main Layout */}
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <aside className="w-[250px] bg-slate-100 border-r border-gray-200 pt-6 px-6 overflow-y-auto">
          {navLinks.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="uppercase text-sm font-semibold mb-2">
                {section.title}
              </h3>
              {section.paths.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className={clsx(
                      "block pl-2 text-sm mb-3 rounded transition-colors",
                      isActive
                        ? "text-slate-100 font-medium bg-gray-600 py-2 shadow-md shadow-blue-400"
                        : "text-gray-600 hover:bg-gray-400 hover:text-slate-100 hover:py-2 hover:shadow-md hover:shadow-blue-400"
                    )}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 h-full overflow-y-scroll pt-6 px-10 mr-48">
          <Suspense fallback={<Loader />}>{children}</Suspense>

          {/* Footer */}
          <footer className="py-10 border-t border-gray-200 flex items-center gap-6">
            <Link
              to="https://www.instagram.com/vettm.e"
              className="p-1 rounded-lg bg-slate-400 cursor-pointer hover:bg-slate-500"
            >
              <Instagram strokeWidth={2} color="white" size={18} />
            </Link>
            <Link
              to="https://www.linkedin.com/company/ijm-global-limited"
              className="p-1 rounded-lg bg-slate-400 cursor-pointer hover:bg-slate-500"
            >
              <Linkedin strokeWidth={1.5} color="white" size={18} />
            </Link>
            <Link
              to="https://web.facebook.com/profile.php?id=61558031707838"
              className="p-1 rounded-lg bg-slate-400 cursor-pointer hover:bg-slate-500"
            >
              <Facebook strokeWidth={1.5} color="white" size={18} />
            </Link>
          </footer>

          <div className="py-10"></div>
        </main>
      </div>
    </div>
  );
}
