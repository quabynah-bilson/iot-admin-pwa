import { kApiKey } from "../../utils/constants";

// fetch feeds from API
export default async function handler(req, res) {
  let result = await fetch(
    `https://api.thingspeak.com/channels/1485581/feeds.json?api_key=${kApiKey}&results=5`
  );
  let responseBody = await result.json();
  let feeds = responseBody["feeds"];
  return res.status(200).json(feeds);
}
