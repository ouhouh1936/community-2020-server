import express, { response } from "express";
import dotenv from "dotenv";
import morgan, { compile } from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

import firestore from "./firebase";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(morgan("dev"));
ffffg;
app.use(cors());
app.use(helmet());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

app.post("/api/getFreeboardData", async (req, res) => {
  console.log("asdassad");
  console.log("asdassad");
  console.log("asdassad");
  console.log("asdassad");
  try {
    let sendData = [];

    await firestore
      .collection("Boards")
      .where("type", "==", "free")
      .where("isDelete", "==", false)
      .get()
      .then((response) =>
        response.forEach((doc) => {
          sendData.push({
            refKey: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            registData: doc.data().registData,
            hit: doc.data().hit,
          });
        })
      );

    return res.json(sendData);
  } catch (e) {
    console.log(e);
    return [];
  }
});

app.listen(PORT, () => {
  console.log(`SERVER START http://localhost:${PORT}`);
});
