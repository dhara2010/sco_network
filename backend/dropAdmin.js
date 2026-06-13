const mongoose = require('mongoose');
require('dotenv').config();

async function dropAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    await mongoose.connection.db.dropCollection('admins');
    console.log('Admins collection dropped');
  } catch (error) {
    if (error.code === 26) {
      console.log('Admins collection does not exist');
    } else {
      console.error(error);
    }
  } finally {
    mongoose.connection.close();
  }
}

dropAdmins();
