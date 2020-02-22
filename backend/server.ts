import { Response, Request } from "express";
import { randomColor } from "./libs/randomColor";

const express = require("express");
const app = express();
const port = 3002;

app.get("/randomColor", (req: Request, res: Response) => {
  const getRandomColor = randomColor();
  res.json({ color: getRandomColor });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
