const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/sdb")
  .then(() => console.log("success"))
  .catch((err) => console.log("failure"));

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [4, "Minimum 4 characters requires"],
    maxlength: 30,
  },
  videos: {
    type: Number,
    required: true,
    maxlength: 100,
  },
  author: {
    type: String,
    required: true,
    enum: ["Saurabh", "Abhishek", "Ravi", ""], // for both string as well for numbers
  },
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
    const mongoPlaylist = new Playlist({
      name: "Mongo",
      videos: 70,
      author: "Ravi",
      active: true,
    });

    const result = await Playlist.insertMany([mongoPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();
