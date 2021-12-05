const { models } = require("../models");

const getProfile = async (req, res, next) => {
  const Profile = models.Profile;
  const profile = await Profile.findOne({
    where: { id: req.get("profile_id") || 0 },
  });
  if (!profile) {
    res.status(401).end();
    return;
  }
  req.profile = profile;
  next();
};
module.exports = getProfile;
