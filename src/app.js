import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

import firebase from "./firebase";
import firestore from "./firebase";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", async (req, res) => {
  console.log("Call Server Test!!");

  try {
    const fsRef = await firestore.collection("Boards");

    await fsRef.get().then((response) =>
      response.forEach((doc) => {
        console.log(doc.data().title);
      })
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`SERVERSTART ${PORT}`);
});
