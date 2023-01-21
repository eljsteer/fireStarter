const mongoose = require('mongoose');

// connect with mongoose 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/firestarter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
