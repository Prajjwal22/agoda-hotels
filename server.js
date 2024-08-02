const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/hotels", async (req, res) => {
  console.log(req);
  try {
    const {
      searchText,
      guid,
      origin,
      cid,
      pageTypeId,
      logtime,
      logTypeId,
      isHotelLandSearch,
    } = req.query;

    console.log(searchText, "pradjjwal");

    const url = `https://www.agoda.com/api/cronos/search/GetUnifiedSuggestResult/3/16/1/0/en-gb/?searchText=${searchText}&guid=${guid}&origin=${origin}&cid=${cid}&pageTypeId=${pageTypeId}&logtime=${logtime}&logTypeId=${logTypeId}&isHotelLandSearch=${isHotelLandSearch}`;

    const response = await axios.get(url);

    res.json(response.data.ViewModelList);
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    res.status(500).send("Internal Server Error", error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
