"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

// ── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ProfileMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const SettingsMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);
const LogoutMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ── Filter data ───────────────────────────────────────────────────────────────
const budgetOptions = ["Any Budget", "Under ₹500", "₹500–₹2000", "₹2000–₹5000", "₹5000+"];
const sortOptions   = ["Newest First", "Oldest First", "Budget: High to Low", "Budget: Low to High"];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [user,           setUser]          = useState<{ name: string; email: string } | null>(null);
  const [searchQuery,    setSearchQuery]   = useState("");
  const [selectedBudget, setSelectedBudget]= useState("Any Budget");
  const [selectedSort,   setSelectedSort]  = useState("Newest First");
  const [profileOpen,    setProfileOpen]   = useState(false);
  const [filterOpen,     setFilterOpen]    = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const filterRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get("/api/user/me", { headers: { Authorization: token } })
      .then((r) => setUser(r.data.user))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (filterRef.current  && !filterRef.current.contains(e.target as Node))  setFilterOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  const initial = user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>

      {/* ══════════════════════════════════════════════
          NAVBAR  —  logo  |  profile
      ══════════════════════════════════════════════ */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 24px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}>
        {/* Logo */}
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #0b2e59 0%, #1d4ed8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Fast<span style={{ WebkitTextFillColor: "#10b981" }}>Money</span>
          </span>
        </Link>

        {/* Profile avatar + dropdown */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            id="profile-btn"
            onClick={() => setProfileOpen((v) => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "5px 10px 5px 5px",
              border: `1.5px solid ${profileOpen ? "#0b2e59" : "#e2e8f0"}`,
              borderRadius: "999px", background: "#fff", cursor: "pointer",
              boxShadow: profileOpen ? "0 0 0 3px rgba(11,46,89,0.08)" : "none",
              transition: "all 0.2s",
            }}
          >
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: "linear-gradient(135deg, #0b2e59, #1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: "13px",
            }}>
              {initial}
            </div>
            <ChevronDown open={profileOpen} />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: "12px", boxShadow: "0 8px 32px rgba(11,46,89,0.12)",
              minWidth: "200px", overflow: "hidden",
              animation: "fadeDown 0.15s ease-out", zIndex: 100,
            }}>
              {/* User info */}
              <div style={{ padding: "12px 14px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #0b2e59, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "15px", flexShrink: 0 }}>
                  {initial}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>{user?.name ?? "User"}</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>{user?.email ?? ""}</p>
                </div>
              </div>

              {[
                { icon: <ProfileMenuIcon />, label: "My Profile", href: "/profile" },
                { icon: <SettingsMenuIcon />, label: "Settings",  href: "/settings" },
              ].map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setProfileOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", textDecoration: "none", color: "#1e293b", fontSize: "13.5px", fontWeight: 500, transition: "background 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f0f6ff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <span style={{ color: "#0b2e59" }}>{item.icon}</span>{item.label}
                </Link>
              ))}

              <div style={{ borderTop: "1px solid #e2e8f0" }}>
                <button id="logout-btn" onClick={handleLogout}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", width: "100%", border: "none", background: "transparent", cursor: "pointer", color: "#ef4444", fontSize: "13.5px", fontWeight: 500, transition: "background 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff5f5")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <LogoutMenuIcon /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          SEARCH BAR  —  sits just below the navbar
      ══════════════════════════════════════════════ */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        padding: "12px 24px",
        display: "flex", alignItems: "center", gap: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}>
        {/* Search input */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "#f8fafc", border: "1.5px solid #e2e8f0",
          borderRadius: "10px", overflow: "hidden",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#0b2e59";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(11,46,89,0.08)";
            (e.currentTarget as HTMLElement).style.background = "#fff";
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.background = "#f8fafc";
            }
          }}
        >
          <span style={{ padding: "0 12px", color: "#94a3b8", display: "flex", flexShrink: 0 }}>
            <SearchIcon />
          </span>
          <input
            id="main-search"
            type="text"
            placeholder="Search gigs, skills, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: "10px 8px", border: "none", outline: "none", fontSize: "14px", color: "#111", background: "transparent" }}
          />
        </div>

        {/* Filters */}
        <div ref={filterRef} style={{ position: "relative", flexShrink: 0 }}>
          <button
            id="filter-btn"
            onClick={() => setFilterOpen((v) => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "10px 16px", background: filterOpen ? "#e2e8f0" : "#f1f5f9",
              border: "1.5px solid #e2e8f0", borderRadius: "10px",
              cursor: "pointer", color: "#334155",
              fontSize: "13.5px", fontWeight: 600, whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#e2e8f0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = filterOpen ? "#e2e8f0" : "#f1f5f9")}
          >
            <FilterIcon /> Filters <ChevronDown open={filterOpen} />
          </button>

          {/* Filter dropdown */}
          {filterOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: "12px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              padding: "18px", minWidth: "240px", zIndex: 100,
              animation: "fadeDown 0.15s ease-out",
            }}>
              <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: "11px", color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase" }}>Budget Range</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "16px" }}>
                {budgetOptions.map((opt) => (
                  <button key={opt} onClick={() => setSelectedBudget(opt)} style={{ textAlign: "left", padding: "8px 12px", border: "none", borderRadius: "7px", cursor: "pointer", fontSize: "13.5px", transition: "background 0.15s", background: selectedBudget === opt ? "#eff6ff" : "transparent", color: selectedBudget === opt ? "#1d4ed8" : "#1e293b", fontWeight: selectedBudget === opt ? 700 : 400 }}>
                    {selectedBudget === opt && "✓ "}{opt}
                  </button>
                ))}
              </div>

              <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: "11px", color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase" }}>Sort By</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "14px" }}>
                {sortOptions.map((opt) => (
                  <button key={opt} onClick={() => setSelectedSort(opt)} style={{ textAlign: "left", padding: "8px 12px", border: "none", borderRadius: "7px", cursor: "pointer", fontSize: "13.5px", transition: "background 0.15s", background: selectedSort === opt ? "#f0fdf4" : "transparent", color: selectedSort === opt ? "#059669" : "#1e293b", fontWeight: selectedSort === opt ? 700 : 400 }}>
                    {selectedSort === opt && "✓ "}{opt}
                  </button>
                ))}
              </div>

              <button onClick={() => setFilterOpen(false)} style={{ width: "100%", padding: "10px", background: "#0b2e59", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13.5px", cursor: "pointer" }}>
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          id="search-btn"
          style={{
            padding: "10px 22px", flexShrink: 0,
            background: "linear-gradient(135deg, #0b2e59 0%, #1d4ed8 100%)",
            color: "#fff", border: "none", borderRadius: "10px",
            fontWeight: 700, fontSize: "13.5px", cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Search
        </button>
      </div>

      {/* ══════════════════════════════════════════════
          ACTIVE FILTER PILLS (below search bar)
      ══════════════════════════════════════════════ */}
      {(selectedBudget !== "Any Budget" || selectedSort !== "Newest First") && (
        <div style={{ padding: "10px 24px", display: "flex", gap: "8px", flexWrap: "wrap", borderBottom: "1px solid #f1f5f9" }}>
          {selectedBudget !== "Any Budget" && (
            <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "4px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              💰 {selectedBudget}
              <button onClick={() => setSelectedBudget("Any Budget")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1d4ed8", fontWeight: 700, padding: 0, lineHeight: 1 }}>×</button>
            </span>
          )}
          {selectedSort !== "Newest First" && (
            <span style={{ background: "#f0fdf4", color: "#059669", padding: "4px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              🗂 {selectedSort}
              <button onClick={() => setSelectedSort("Newest First")} style={{ background: "none", border: "none", cursor: "pointer", color: "#059669", fontWeight: 700, padding: 0, lineHeight: 1 }}>×</button>
            </span>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          EMPTY CONTENT AREA
      ══════════════════════════════════════════════ */}
      <main style={{ flex: 1, background: "#fff" }} />

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
