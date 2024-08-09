const admin = require("../../../configs/serviceAccount");
const User = require("../../model/user");

exports.socialAuth = async (req, res, next) => {
    const { uid, socialType } = req.body;

    if (!uid || !socialType) {
        return res.status(400).send({ message: 'Invalid details' });
    }

    try {
        let userAccessDetails;
        if (socialType === 'google') {
            userAccessDetails = await admin.auth().getUserByProviderUid('google.com', uid);
        }

        if (!userAccessDetails) {
            return res.status(400).send({ message: 'User access details not found' });
        }

        let existingUser = await User.findOne({ email: userAccessDetails.email });
        let responseToSend = null;

        if (existingUser) {
            responseToSend = {
                name: existingUser.name,
                email: existingUser.email,
                profilePic: existingUser.profilePic,
                uid: uid
            };
        } else {
            let newUser = await User.create({
                name: userAccessDetails.displayName,
                email: userAccessDetails.email,
                profilePic: userAccessDetails.photoURL,
                password: `${Math.random().toString(36).substr(2, 8)}`,
                uid: uid,
                createdAt: Date.now()
            });
            responseToSend = {
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                uid: uid
            };
        }

        return res.status(200).send({ message: 'User login successfully', data: responseToSend });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message, status: 500 });
    }
};
