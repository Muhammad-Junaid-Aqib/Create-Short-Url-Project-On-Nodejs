const shortid = require("shortid");

const URL = require("../models/url");

const handlerGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url)
    return res.status(404).json({
      error: "url is required",
    });
   
    console.log("junaid now")
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
};

module.exports = {
  handlerGenerateNewShortUrl,
};
