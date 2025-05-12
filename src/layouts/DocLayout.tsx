import images from "@/assets/Images";
import Loader from "@/components/Loader";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  {
    title: "Vettme Pro Documentation",
    path: "/docs",
    paths: [{ title: "Introduction", path: "introduction" }],
  },
  {
    title: "Features",
    path: "/docs/features",
    paths: [
      { title: "Physical Verification", path: "physical-verification" },
      { title: "Guarantor Verification", path: "guarantor-verification" },
      { title: "Professional Information Verification", path: "professional-verification" },
      { title: "Academic & Mental Health Verification", path: "academic-health-verification" },
    ],
  },
  {
    title: "User Onboarding & Activation",
    path: "/docs/activation",
    paths: [
      { title: "Signup Process", path: "signup-process" },
      { title: "Company Compliance Verification", path: "company-compliance" },
    ],
  },
  {
    title: "Verification Request Process",
    path: "/docs/verification",
    paths: [
      { title: "Form Submission", path: "form-submission" },
      { title: "Charges & Fees", path: "charges-fees" },
    ],
  },
];

function useScrollSpy(ids: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -80% 0px`, threshold: 0.1 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}

export default function DocLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const sectionIds =
    navLinks.find((nav) => nav.path === currentPath)?.paths.map((p) => p.path) || [];

  const activeSection = useScrollSpy(sectionIds);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 flex items-center justify-between border-b border-gray-200 px-6 shrink-0">
        <img src={images.logo} alt="Vettme" className="w-full max-w-[80px]" />
        <Link to="/">
          <Button className="pry-btn">Dashboard</Button>
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[250px] bg-slate-100 border-r border-gray-200 pt-6 p-5 h-full overflow-y-auto shrink-0">
          {navLinks.map((nav, i) => {
            const isMainActive = currentPath === nav.path;

            return (
              <div key={i} className="mb-6">
                <Link
                  to={nav.path}
                  className={clsx(
                    "uppercase text-sm font-semibold mb-2 flex items-center justify-between",
                    isMainActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  <span>{nav.title}</span>
                  <span className="ml-2">
                    {isMainActive ? "▼" : "▶"}
                  </span>
                </Link>

                {isMainActive &&
                  nav.paths.map((sub, j) => {
                    const isActive = activeSection === sub.path;
                    return (
                      <a
                        key={j}
                        href={`#${sub.path}`}
                        className={clsx(
                          "block pl-2 text-sm mb-3 transition-colors rounded-md",
                          isActive
                            ? "text-slate-100 font-medium bg-gray-600 py-2 shadow-md shadow-blue-400"
                            : "text-gray-600 hover:bg-gray-400 hover:text-slate-100 hover:py-2 hover:shadow-md hover:shadow-blue-400"
                        )}
                      >
                        {sub.title}
                      </a>
                    );
                  })}
              </div>
            );
          })}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-scroll pt-6 px-10 mr-48 scroll-smooth">
          <Suspense fallback={<Loader />}>{children}</Suspense>

          {/* Footer */}
          <div className="py-10 border-t border-gray-200 flex items-center gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
