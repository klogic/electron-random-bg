import { Response, Request } from "express";
const express = require("express");
const app = express();
const port = 3001;
import { randomColor } from "../libs/randomColor";

app.get("/randomColor", (req: Request, res: Response) => {
  const getRandomColor = randomColor();
  res.json({ color: getRandomColor });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
