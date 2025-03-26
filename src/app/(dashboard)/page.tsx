"use client"

import { LayoutDashboard, FileText, CheckCircle, User, ChevronDown, Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Sidebar = ({ role, setRole, isOpen, setIsOpen }) => {
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Submit Claim", icon: FileText, href: "/claims" },
  ];

  if (role !== "lecturer") {
    menuItems.push({ label: "Approvals", icon: CheckCircle, href: "/approvals" });
  }

  return (
    <div className={`fixed inset-y-0 left-0 bg-gray-900 bg-opacity-75 backdrop-blur-md text-white p-4 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 w-64 h-screen z-50 shadow-lg flex flex-col justify-between`}> 
      <div>
        <h2 className="text-xl font-bold mb-4">Claims System</h2>
        <nav>
          {menuItems.map(({ label, icon: Icon, href }) => (
            <Link key={label} href={href} className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md" onClick={() => setIsOpen(false)}>
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2">Switch Role</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between items-center text-black bg-gray-300 hover:bg-gray-400">
              <User className="w-4 h-4 mr-2" />
              {role.charAt(0).toUpperCase() + role.slice(1)}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {['lecturer', 'coordinator', 'registry'].map((r) => (
              <DropdownMenuItem 
                key={r} 
                onClick={() => { setRole(r); setIsOpen(false); }} 
                className={`${role === r ? 'bg-black text-white' : 'bg-gray-200 text-black'} hover:bg-gray-400 hover:text-black flex items-center gap-2`}
              >
                <User className="w-4 h-4" />
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [role, setRole] = useState("lecturer"); // Default role
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar role={role} setRole={setRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${isOpen ? "ml-64" : "w-full"}`}>
        {!isOpen && (
          <Button variant="ghost" onClick={toggleSidebar} className="mb-4">
            <Menu className="w-6 h-6" />
          </Button>
        )}
        <h1 className="text-2xl font-bold">Dashboard ({role.charAt(0).toUpperCase() + role.slice(1)})</h1>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-bold">Total Claims</h2>
              <p className="text-2xl">120</p>
            </CardContent>
          </Card>
          {role !== "lecturer" && (
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold">Pending Approvals</h2>
                <p className="text-2xl">15</p>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-bold">Approved Claims</h2>
              <p className="text-2xl">90</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
