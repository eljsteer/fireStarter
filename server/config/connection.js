const mongoose = require('mongoose');

// connect with mongoose 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/firestarter", {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
