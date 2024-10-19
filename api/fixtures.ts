import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const user = new User({
    email: 'anton@local.com',
    password: 'antonpass',
    role: 'user',
    displayName: 'Anton Panamarenko',
  });

  user.generateToken();
  await user.save();

  const admin = new User({
    email: 'den@local.com',
    password: 'denpass',
    role: 'admin',
    displayName: 'Den Administrator',
  });

  admin.generateToken();
  await admin.save();

  await Photo.create({
    user: user._id,
    title: 'Photo of the lake',
    photo: 'fixtures/nature1.jpeg',
  }, {
    user: user._id,
    title: 'Photo of dawn',
    photo: 'fixtures/nature2.jpeg',
  }, {
    user: admin._id,
    title: 'Photo of panda',
    photo: 'fixtures/animal1.jpeg',
  }, {
    user: admin._id,
    title: 'Otter photo',
    photo: 'fixtures/animal2.jpeg',
  });


  await db.close();
};

run().catch(console.error);