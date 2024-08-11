import {} from "dotenv/config";
import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));

/**Dates */
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
let months = month[d.getMonth()];
let days = d.getDate();
let year = d.getFullYear();

// This is the Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/triPosts`);
    console.log(response);
    res.render("index.ejs", {
      triPosts: response.data,
      date: `${days} ${months}, ${year}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
// app.get("/new", (req, res) => {
//   res.render("partials/_header.ejs");
// });

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/triPosts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.render("partials/_header.ejs", {
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// This Creates new POST
app.post("/api/triPosts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/triPosts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Makes the new Updates by using Patch
app.post("/api/triPosts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/triPosts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Deletes POSTS
app.get("/api/triPosts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/triPosts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

//Routers to run pages
app.get("/about", (req, res) => {
  res.render("_about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("_registerForm.ejs");
});

app.get("/motherAfrica", (req, res) => {
  res.render("motherAfrica.ejs", { date: `${days} ${months}, ${year}` });
});
app.get("/cocktailTrip", (req, res) => {
  res.render("cocktailTrip.ejs", { date: `${days} ${months}, ${year}` });
});
app.get("/tripSpain", (req, res) => {
  res.render("tripSpain.ejs", { date: `${days} ${months}, ${year}` });
});

app.get("/cancunBar", (req, res) => {
  res.render("cancunBar.ejs", { date: `${days} ${months}, ${year}` });
});

app.get("/disneyParis", (req, res) => {
  res.render("disneyParis.ejs", { date: `${days} ${months}, ${year}` });
});

app.get("/jamaicanResort", (req, res) => {
  res.render("jamaicanResort.ejs");
});
app.get("/amsterdamAutumn", (req, res) => {
  res.render("amsterdamAutumn.ejs");
});

//Backend PORT:

app.listen(PORT, () => {
  console.log(`The Backend server is NOW running on http://localhost:${PORT}`);
});
