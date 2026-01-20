import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReportIssueForm from "../components/ReportIssueForm";
import IssuesFeed from "../components/IssuesFeed";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("feed");

    return (
        <div className="min-h-screen bg-[#1a1a2e] text-white font-poppins">
            {/* Header */}
            <header className="p-4 bg-[#16213e] flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#00d4ff] rounded-full flex items-center justify-center text-[#1a1a2e] font-bold text-xl">
                        S
                    </div>
                    <h1 className="text-2xl font-bold tracking-wide">StreetFix</h1>
                </div>
                {/* User Profile / Logout Placeholder */}
                <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
            </header>

            {/* Quick Actions (Mobile First) */}
            <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab("report")}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === 'report' ? 'bg-[#00d4ff] text-[#1a1a2e] font-bold' : 'bg-[#16213e] border border-[#00d4ff] text-[#00d4ff]'}`}
                >
                    Report Issue
                </button>
                <button
                    onClick={() => setActiveTab("feed")}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === 'feed' ? 'bg-[#00d4ff] text-[#1a1a2e] font-bold' : 'bg-[#16213e] border border-[#00d4ff] text-[#00d4ff]'}`}
                >
                    Public Feed
                </button>
            </div>

            {/* Main Content Area */}
            <main className="p-4 pb-20 max-w-2xl mx-auto">
                {activeTab === "report" && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-bold mb-4 text-[#00d4ff]">Report New Issue</h2>
                        <ReportIssueForm onSuccess={() => setActiveTab("feed")} />
                    </div>
                )}

                {activeTab === "feed" && (
                    <div className="animate-fade-in">
                        <IssuesFeed />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
