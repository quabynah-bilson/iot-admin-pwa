import { kApiKey } from "../../utils/constants";

// fetch feeds from API
export default async function handler(req, res) {
  let result = await fetch(
    `https://api.thingspeak.com/channels/1485581/feeds.json?api_key=${kApiKey}&results=5`
  );
  let responseBody = await result.json();
  let feeds = responseBody["feeds"].filter((value, index, arr) => {
    //! TODO => show only values under the threshold
    //  get the threshold value
    var shouldAdd = value
      ? parseFloat(value["field1"]) > 16.0
      : console.log(value["field1"]);
    if (shouldAdd) console.log(value["field1"]);
    return shouldAdd;
  });
  return res.status(200).json(feeds);
}
