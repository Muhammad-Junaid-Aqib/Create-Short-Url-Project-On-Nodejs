const shortid = require("shortid");

const URL = require("../models/url");

const handlerGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url)
    return res.status(404).json({
      error: "url is required",
    });

  console.log("junaid now: ");
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });
  return res.render("home", {
    id: shortID,
  });
};

const handleGetFunction = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handlerGenerateNewShortUrl,
  handleGetAnalytics,
  handleGetFunction,
};
