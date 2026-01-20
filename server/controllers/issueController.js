import Issue from "../models/issueModel.js";

export const createIssue = async (req, res) => {
    try {
        const { type, title, description, lat, lng, address, urgency, userId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newIssue = new Issue({
            userId,
            type,
            title,
            description,
            location: {
                lat,
                lng,
                address
            },
            imageUrl,
            urgency
        });

        await newIssue.save();

        res.json({ success: true, message: "Issue Reported Successfully", issue: newIssue });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 }).populate('userId', 'name');
        res.json({ success: true, issues });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const upvoteIssue = async (req, res) => {
    try {
        const { issueId, userId } = req.body;
        const issue = await Issue.findById(issueId);

        if (issue.upvotes.includes(userId)) {
            issue.upvotes = issue.upvotes.filter(id => id.toString() !== userId);
        } else {
            issue.upvotes.push(userId);
        }

        await issue.save();
        res.json({ success: true, message: "Upvote updated", upvotes: issue.upvotes });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
