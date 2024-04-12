import { Url } from "../models/urlmodel.js";
import shortUrl from "node-url-shortener";

//fetching all links
async function getLinks(req, res) {
  try {
    const urls = await Url.find({});
    res.json({ message: "success", data: urls });
  } catch (error) {
    res.json({ message: error.message });
  }
}

//post the links
async function postLink(req, res) {
  try {
    // const userId = req.user.id;
    const { url } = req.body;

    //short the given url

    shortUrl.short(url, async function (err, shorturl) {
      try {
        const URL = { url, shorturl };
        await Url.create(URL);
      } catch (error) {
        res.json({ message: err });
      }
    });
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.json({ message: error.message });
  }
}

//delete the links
async function deleteLink(req, res) {
  try {
    const { id } = req.params;
    await Url.deleteOne({ _id: id });
    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: error.message });
  }
}

export default { getLinks, postLink, deleteLink };
