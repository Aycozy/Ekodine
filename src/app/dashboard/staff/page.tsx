"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Mail, MoreVertical, Shield, ShieldAlert, ShieldCheck, UserCircle, Search } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  status: "active" | "inactive";
  joinedAt: string;
}

const demoStaff: StaffMember[] = [
  { id: "1", name: "Alex Johnson", email: "alex@restaurant.com", role: "OWNER", status: "active", joinedAt: "Jan 2025" },
  { id: "2", name: "Maria Garcia", email: "maria@restaurant.com", role: "MANAGER", status: "active", joinedAt: "Mar 2025" },
  { id: "3", name: "James Wilson", email: "james@restaurant.com", role: "STAFF", status: "active", joinedAt: "Jun 2025" },
  { id: "4", name: "Sarah Chen", email: "sarah@restaurant.com", role: "STAFF", status: "active", joinedAt: "Aug 2025" },
  { id: "5", name: "Tom Baker", email: "tom@restaurant.com", role: "STAFF", status: "inactive", joinedAt: "Sep 2025" },
  { id: "6", name: "Linda Park", email: "linda@restaurant.com", role: "MANAGER", status: "active", joinedAt: "Nov 2025" },
];

const roleConfig = {
  OWNER: { label: "Owner", color: "bg-purple-100 text-purple-700", icon: ShieldAlert },
  MANAGER: { label: "Manager", color: "bg-blue-100 text-blue-700", icon: ShieldCheck },
  STAFF: { label: "Staff", color: "bg-stone-100 text-stone-700", icon: Shield },
};

export default function StaffPage() {
  const [staff, setStaff] = useState(demoStaff);
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"MANAGER" | "STAFF">("STAFF");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangeRole = (id: string, role: "MANAGER" | "STAFF") => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, role } : s)));
    setMenuOpenId(null);
  };

  const handleToggleStatus = (id: string) => {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
      )
    );
    setMenuOpenId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Staff</h1>
          <p className="text-stone-500 mt-1">{staff.filter((s) => s.status === "active").length} active members</p>
        </div>
        <button
          id="invite-staff"
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Invite Staff
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-full transition-all"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => {
          const config = roleConfig[member.role];
          const RoleIcon = config.icon;
          return (
            <div
              key={member.id}
              className={cn(
                "bg-white rounded-xl border p-5 hover:shadow-md transition-shadow relative",
                member.status === "inactive" && "opacity-60"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-amber-100 rounded-xl flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-stone-900 truncate">{member.name}</h3>
                    {member.role !== "OWNER" && (
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpenId(menuOpenId === member.id ? null : member.id)}
                          className="p-1 rounded-lg hover:bg-stone-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-stone-400" />
                        </button>
                        {menuOpenId === member.id && (
                          <div className="absolute right-0 top-8 bg-white border rounded-xl shadow-lg py-1 w-44 z-10">
                            <button
                              onClick={() => handleChangeRole(member.id, member.role === "MANAGER" ? "STAFF" : "MANAGER")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                            >
                              <Shield className="w-4 h-4" />
                              {member.role === "MANAGER" ? "Demote to Staff" : "Promote to Manager"}
                            </button>
                            <button
                              onClick={() => handleToggleStatus(member.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <UserCircle className="w-4 h-4" />
                              {member.status === "active" ? "Deactivate" : "Reactivate"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 truncate">{member.email}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", config.color)}>
                      <RoleIcon className="w-3 h-3" /> {config.label}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      member.status === "active" ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"
                    )}>
                      {member.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-2">Joined {member.joinedAt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {inviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setInviteOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-heading font-bold text-stone-900">Invite Staff Member</h2>
              <p className="text-sm text-stone-500 mt-1">Send an email invitation to join your team</p>
            </div>
            <form
              className="p-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setInviteOpen(false);
                setInviteEmail("");
              }}
            >
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="staff@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Role</label>
                <div className="flex gap-3">
                  {(["STAFF", "MANAGER"] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setInviteRole(role)}
                      className={cn(
                        "flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all",
                        inviteRole === role
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-stone-200 text-stone-600 hover:border-stone-300"
                      )}
                    >
                      {roleConfig[role].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteOpen(false)}
                  className="flex-1 py-3 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/25"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
