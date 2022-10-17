const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/firestarter', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
