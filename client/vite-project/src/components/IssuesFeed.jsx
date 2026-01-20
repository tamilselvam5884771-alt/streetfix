import { useState, useEffect } from "react";
import axios from "axios";

const IssuesFeed = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const { data } = await axios.get("/api/issues/all");
            if (data.success) {
                setIssues(data.issues);
            }
        } catch (error) {
            console.error("Error fetching issues", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post("/api/issues/upvote", { issueId: id });
            if (data.success) {
                // Optimistic update
                setIssues(prev => prev.map(issue =>
                    issue._id === id ? { ...issue, upvotes: data.upvotes } : issue
                ));
            }
        } catch (error) {
            alert("Login required to upvote");
        }
    };

    if (loading) return <div className="text-center p-10 text-[#00d4ff]">Loading feed...</div>;

    if (issues.length === 0) return <div className="text-center p-10 text-gray-400">No issues reported yet.</div>;

    return (
        <div className="flex flex-col gap-4">
            {issues.map((issue) => (
                <div key={issue._id} className="bg-[#16213e] rounded-xl overflow-hidden shadow-lg border border-gray-700 animate-slide-up">
                    {/* Header */}
                    <div className="p-4 flex justify-between items-start">
                        <div>
                            <span className="inline-block px-2 py-1 text-xs font-bold rounded bg-[#2c1a1a] text-red-400 mb-1 border border-red-900">
                                {issue.urgency} Priority
                            </span>
                            <h3 className="text-lg font-bold text-white">{issue.title}</h3>
                            <p className="text-xs text-gray-400">{new Date(issue.createdAt).toLocaleDateString()} • {issue.type}</p>
                        </div>
                        <div className={`px-3 py-1 text-xs rounded-full border ${issue.status === 'Resolved' ? 'border-green-500 text-green-400' : 'border-yellow-500 text-yellow-400'
                            }`}>
                            {issue.status}
                        </div>
                    </div>

                    {/* Image */}
                    {issue.imageUrl && (
                        <div className="w-full h-48 overflow-hidden bg-black">
                            <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-4">
                        <p className="text-sm text-gray-300 mb-3">{issue.description}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                            <i className="fa-solid fa-location-dot"></i>
                            Near: {issue.location?.address || `Lat: ${issue.location?.lat?.toFixed(4)}, Lng: ${issue.location?.lng?.toFixed(4)}`}
                        </p>

                        <div className="border-t border-gray-700 pt-3 flex justify-between items-center text-sm">
                            <button
                                onClick={() => handleUpvote(issue._id)}
                                className="flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors"
                            >
                                <i className="fa-regular fa-thumbs-up"></i>
                                {issue.upvotes.length} Supports
                            </button>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IssuesFeed;
