import { useRef, useState } from "react";
import axios from "axios";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "./CreateNewPost.css";

const CreateNewPost = ({ onClose }) => {
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("test-image");
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef(null);



    const handleFile = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
            return;
        }

        setSelectedFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];

        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        handleFile(file);
    };





    const handlePublish = async (e) => {
        e.preventDefault();

        if (!title || !content || !image || !category) {
            alert("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_DOMAIN_NAME}/api/blogs/create-blog`,
                {
                    title,
                    description: content,
                    image,
                    category,
                    date: new Date().toISOString().split("T")[0]
                },
                {
                    withCredentials: true
                }
            );

            console.log(response.data);

            alert("Blog published successfully");

            onClose();

        } catch (error) {
            console.error("Error creating blog:", error);

            alert(
                error.response?.data?.message ||
                "Failed to publish blog"
            );
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="create-post-overlay" onClick={onClose}>
            <div
                className="create-post-drawer"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="create-post-header">
                    <button
                        className="create-post-close"
                        onClick={onClose}
                    >
                        <IoClose />
                    </button>

                    <h2>Create New Post</h2>
                </div>

                {/* Upload Area */}
                <div
                    className={`create-post-upload ${isDragging ? "dragging" : ""
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    {selectedFile ? (
                        <div className="create-post-preview">
                            {selectedFile.type.startsWith("image/") ? (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected"
                                />
                            ) : (
                                <video
                                    src={URL.createObjectURL(selectedFile)}
                                    controls
                                />
                            )}

                            <p>{selectedFile.name}</p>
                        </div>
                    ) : (
                        <div className="create-post-upload-content">
                            <IoCloudUploadOutline className="create-post-upload-icon" />

                            <p className="create-post-upload-title">
                                Click to upload or drag and drop
                            </p>

                            <p className="create-post-upload-subtitle">
                                Upload images or videos
                            </p>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </div>

                {/* Form */}
                <form className="create-post-form" onSubmit={handlePublish}>
                    <div className="create-post-field">
                        <label htmlFor="post-title">Title</label>
                        <input
                            type="text"
                            id="post-title"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="create-post-field">
                        <label htmlFor="post-category">Category</label>
                        <select
                            id="post-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="wellness">Wellness</option>
                            <option value="fashion">Fashion</option>
                            <option value="travel">Travel</option>
                            <option value="motivation">Motivation</option>
                            <option value="food">Food</option>
                        </select>
                    </div>

                    <div className="create-post-field">
                        <label htmlFor="post-content">About Post</label>
                        <textarea
                            id="post-content"
                            placeholder="Write your post content here..."
                            maxLength={10000}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <p className="create-post-character-count">
                            {content.length.toLocaleString()}/10,000 characters
                        </p>
                    </div>

                    <div className="create-post-field">
                        <label htmlFor="post-tags">Tags</label>
                        <input
                            type="text"
                            id="post-tags"
                            placeholder="Creativity, habits, routine (comma separated)"
                        />
                    </div>

                    {/* Footer */}
                    <div className="create-post-actions">
                        <button type="button" className="create-post-draft">
                            <FaRegSave />
                            Save Draft
                        </button>

                        <button
                            type="submit"
                            className="create-post-publish"
                            disabled={loading}
                        >
                            <FiSend />
                            {loading ? "Publishing..." : "Publish Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewPost;