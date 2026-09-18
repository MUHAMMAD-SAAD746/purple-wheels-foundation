function generateAvatarUrl(username) {
    if (!username) return "";

    return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(username)}`;
}

export default generateAvatarUrl;