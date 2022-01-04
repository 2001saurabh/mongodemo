const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/sdb")
  .then(() => console.log("success"))
  .catch((err) => console.log("failure"));

const playlistSchema = new mongoose.Schema({
  name: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//model and it is a collection which is defined as class
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert

// const reactPlaylist = new Playlist({
//   name: "React",
//   videos: 50,
//   author: "Saurabh",
//   active: true,
// });

// reactPlaylist.save();

// insert one document
// const createDocument = async () => {
//   try {
//     const reactPlaylist = new Playlist({
//       name: "Nodejs",
//       videos: 60,
//       author: "Saurabh",
//       active: true,
//     });
//     const result = await reactPlaylist.save();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// createDocument();

//insert many

const createDocument = async () => {
  try {
    const jsPlaylist = new Playlist({
      name: "js",
      videos: 60,
      author: "Saurabh",
      active: true,
    });
    const mongoPlaylist = new Playlist({
      name: "Mongo",
      videos: 70,
      author: "Ravi",
      active: true,
    });
    const expressPlaylist = new Playlist({
      name: "express",
      videos: 10,
      author: "Abhishek",
      active: true,
    });
    const result = await Playlist.insertMany([
      jsPlaylist,
      mongoPlaylist,
      expressPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// createDocument();

//read document

const getDocument = async () => {
  const result = await Playlist.find({
    author: { $nin: ["Saurabh", "Ravi", "Abhishek"] },
  }).select({
    author: 1,
  });
  const result1 = await Playlist.count({ author: "Saurabh" });
  // .limit(1);
  const aggregateResult = await Playlist.aggregate([
    { $match: {} },
    { $group: { _id: "$author", total: { $sum: "$videos" } } },
    { $sort: { total: -1 } },
  ]);
  console.log(aggregateResult);
  console.log(result1);
  console.log(result);
};

getDocument();
