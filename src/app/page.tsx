"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User, Briefcase, Building, Menu } from "lucide-react";

const LandingPage = () => {
  const [role, setRole] = useState("lecturer");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-6">
      <header className="w-full max-w-4xl text-center mb-10 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-gray-900 flex items-center gap-2 justify-center">
          <Briefcase className="w-10 h-10 text-black" /> Claims Management System
        </h1>
      </header>

      <div className="mb-6 flex flex-col items-center">
        <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <User className="w-6 h-6 text-black" /> Select Role:
        </label>
        <select
          className="p-3 border border-gray-300 rounded-lg text-lg shadow-sm"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="lecturer">Lecturer</option>
          <option value="coordinator">Coordinator</option>
          <option value="registry">Registry</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Link href="/dashboard" passHref>
          <Button className="px-8 py-4 text-lg font-semibold shadow-md flex items-center gap-2">
            <Building className="w-5 h-5 text-black" /> Go to Dashboard
          </Button>
        </Link>
        {role === "lecturer" && (
          <Link href="/claims" passHref>
            <Button variant="outline" className="px-8 py-4 text-lg font-semibold shadow-md flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-black" /> Submit a Claim
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
