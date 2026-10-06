const followModel = require("../model/follows.model");
const userModel = require("../model/user.model");



async function followUser(req, res) {
    const followerId = req.user.userId;
    const followingId = req.params.userId;

    try {

        // Cannot follow yourself
        if (followerId === followingId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        // Check if target user exists
        const user = await userModel.findById(followingId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if already following
        const existingFollow = await followModel.findOne({
            follower: followerId,
            following: followingId
        });

        if (existingFollow) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        // Create follow relationship
        await followModel.create({
            follower: followerId,
            following: followingId
        });

        // Increase following count for follower
        await userModel.findByIdAndUpdate(
            followerId,
            { $inc: { following: 1 } }
        );

        // Increase followers count for target user
        await userModel.findByIdAndUpdate(
            followingId,
            { $inc: { followers: 1 } }
        );

        return res.status(200).json({
            message: "User followed successfully"
        });

    } catch (error) {

        console.error("Error following user:", error);

        return res.status(500).json({
            message: "Failed to follow user"
        });
    }
}




async function unfollowUser(req, res) {

    const followerId = req.user.userId;
    const followingId = req.params.userId;

    try {

        // Check if follow relationship exists
        const existingFollow = await followModel.findOne({
            follower: followerId,
            following: followingId
        });

        if (!existingFollow) {
            return res.status(400).json({
                message: "You are not following this user"
            });
        }

        // Remove follow relationship
        await followModel.findByIdAndDelete(existingFollow._id);

        // Decrease following count for follower
        await userModel.findByIdAndUpdate(
            followerId,
            { $inc: { following: -1 } }
        );

        // Decrease followers count for target user
        await userModel.findByIdAndUpdate(
            followingId,
            { $inc: { followers: -1 } }
        );

        return res.status(200).json({
            message: "User unfollowed successfully"
        });

    } catch (error) {

        console.error("Error unfollowing user:", error);

        return res.status(500).json({
            message: "Failed to unfollow user"
        });
    }
}



module.exports = {
    followUser,
    unfollowUser
};