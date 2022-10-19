import mongoose from "mongoose";

async function db() {
  const mydb = "mongodb://localhost:27017/shortUrl";
  try {
    await mongoose
      .connect(mydb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`DB is connected to ${mydb}`))
      .catch((e) => console.error(e));
  } catch (e) {
    console.error(e);
  }
}

export default db;
