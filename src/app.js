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

// <-----------------------  C R U D   O P E R A T I O N  ------------------------------------->

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

  // Aggrigation example

  const aggregateResult = await Playlist.aggregate([
    { $match: { $in: ["js", "React"] } }, //filtering
    { $group: { _id: "$author", total: { $sum: "$videos" } } },
    { $sort: { total: -1 } },
  ]);
  console.log(aggregateResult);
  console.log(result1);
  console.log(result);
};

// getDocument();

//update
// const updateDocument = async (_id) => {
//   try {
//     const result = await Playlist.updateOne(
//       { _id },
//       {
//         $set: {
//           name: "JavaScript",
//         },
//       }
//     );
//     console.log(result);
//   } catch {
//     (err) => console.log(err);
//   }
// };
// updateDocument("61d3dd39c552bdd137e01fdc");

const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: "JavaScript",
        },
      },
      {
        new: true,
      }
    );
    console.log(result);
  } catch {
    (err) => console.log(err);
  }
};
// updateDocument("61d3dd39c552bdd137e01fdc");

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id });
    console.log(result);
  } catch {
    (err) => console.log(err);
  }
};
deleteDocument("61d3dcb1116b908469d235ec");

/*<------------------------------------End----------------------------------------> */
