const { models } = require("../models");

/**
 * @param {"body" | "query" | "params" | "headers"} from where to get the profile id from
 * @param {string} key the key in the previously specified `from` object to use to get the profile id
 * @param {string} [outputKey] the key on the request object to put the profile. defaults to key
 * @returns {import('express').RequestHandler}
 */
const withProfile =
  (from, key, outputKey, profileType) => async (req, res, next) => {
    outputKey = outputKey || key;
    const Profile = models.Profile;
    const profileId = from === "headers" ? req.header(key) : req[from][key];
    const profile = await Profile.findOne({
      where: { id: profileId || 0 },
    });
    if (!profile) {
      res.status(404).end("Profile not found");
      return;
    }
    if (profileType != null && profile.type !== profileType) {
      res.status(403).end(`Not of type "${profileType}"`);
      return;
    }
    req[outputKey] = profile;
    next();
  };

module.exports = withProfile;
