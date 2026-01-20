import { useState, useRef, useMemo } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// Retain default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


function LocationMarker({ position, setPosition }) {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

const ReportIssueForm = ({ onSuccess }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Pothole");
    const [urgency, setUrgency] = useState("Medium");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default London, should auto detect
    const [isLocating, setIsLocating] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("urgency", urgency);
        formData.append("lat", position.lat);
        formData.append("lng", position.lng);
        if (image) formData.append("image", image);

        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post("/api/issues/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.success) {
                alert("Issue Submitted Successfully!");
                onSuccess();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Submission Failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#16213e] p-6 rounded-xl shadow-lg border border-gray-700">
            {/* Issue Type */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Issue Type</label>
                <select
                    value={type} onChange={(e) => setType(e.target.value)}
                    className="bg-[#1a1a2e] border border-gray-600 rounded-lg p-3 outline-none text-white focus:border-[#00d4ff]"
                >
                    <option>Pothole</option>
                    <option>Garbage / Waste</option>
                    <option>Broken Streetlight</option>
                    <option>Water Leakage</option>
                    <option>Road Damage</option>
                    <option>Other</option>
                </select>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Title</label>
                <input
                    type="text" placeholder="Short description" required
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    className="bg-[#1a1a2e] border border-gray-600 rounded-lg p-3 outline-none text-white focus:border-[#00d4ff]"
                />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Description</label>
                <textarea
                    rows="3" placeholder="Explain details..."
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#1a1a2e] border border-gray-600 rounded-lg p-3 outline-none text-white focus:border-[#00d4ff]"
                ></textarea>
            </div>

            {/* Map */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Location (Tap map to pin)</label>
                <div className="h-48 rounded-lg overflow-hidden border border-gray-600 relative z-0">
                    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>
                </div>
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Photo Evidence</label>
                <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-[#1a1a2e] border border-[#00d4ff] text-[#00d4ff] px-4 py-2 rounded-lg hover:bg-[#00d4ff] hover:text-[#1a1a2e] transition-all">
                        <span>Upload Photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    {preview && <img src={preview} alt="Preview" className="w-16 h-16 rounded object-cover border border-gray-600" />}
                </div>
            </div>

            {/* Urgency */}
            <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Urgency</label>
                <div className="flex gap-4">
                    {["Low", "Medium", "High"].map(level => (
                        <label key={level} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="urgency"
                                value={level}
                                checked={urgency === level}
                                onChange={(e) => setUrgency(e.target.value)}
                            />
                            <span className={level === "High" ? "text-red-400" : "text-gray-300"}>{level}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="mt-4 bg-[#00d4ff] text-[#1a1a2e] font-bold py-3 rounded-lg hover:bg-[#00b8d4] transition-all">
                Submit Report
            </button>
        </form>
    );
};

export default ReportIssueForm;
