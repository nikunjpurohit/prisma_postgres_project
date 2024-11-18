import express from "express"
const app = express()
import "dotenv/config";

const PORT = process.env.PORT || 3000
// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.send("Hello, World!")
  });

// Router file
import routes from './routes/index.js';
app.use(routes)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));