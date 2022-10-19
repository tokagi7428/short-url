import express from "express";
import shortUrl from "../model/shortModel.js";
import createShortUrlschemas from "../schemas/createShortUrlschemas.js";
import validateResource from "../middleware/validateResource.js";
import analytics from "../model/analytics.model.js";
const router = express.Router();

router.get("/url", (req, res) => {
  res.send("Hello");
});

router.post(
  "/url",
  validateResource(createShortUrlschemas),
  async (req, res) => {
    const { destination } = req.body;
    // console.log({ destination });
    const checkUrl = await shortUrl.findOne({ destination });
    if (checkUrl) {
      res.json({ status: "Link has registed" });
    } else {
      const newUrl = new shortUrl({ destination });
      const url = await newUrl.save();
      res.json({ status: "ok", data: url });
    }
  }
);

router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const dest = await shortUrl.findOne({ shortId }).lean();
  if (!dest) {
    return res.sendStatus(404);
  }

  await shortUrl.findByIdAndUpdate(dest._id, { countUrl: dest.countUrl + 1 });
  analytics.create({ shortUrl: dest._id });
  res.redirect(dest.destination);
});

router.get("/url/analytics", async (req, res) => {
  const url = await shortUrl.find({});
  // console.log({ url });
  res.send(url);
});

export default router;
