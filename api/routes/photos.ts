import express from 'express';
import Photo from '../models/Photo';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import permit from '../middleware/permit';
import User from '../models/User';

const photosRouter = express.Router();

photosRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.query.user;
    const photos = await Photo.find(userId ? ({user: userId}) : ({})).populate('user', 'displayName');

    if(userId) {
      const user = await User.findById(userId);

      if(!user) {
        return res.status(400).send({error: 'User not found'});
      }

      const response = {
        user,
        photos,
      }

      return res.send(response);
    }
    return res.send(photos);
  } catch (error) {
    return next(error);
  }
});

photosRouter.post('/', auth, imagesUpload.single('photo'), async (req: RequestWithUser, res, next) => {
  try {
    const photo = new Photo({
      user: req.user?._id,
      title: req.body.title,
      photo: req.file && req.file.filename,
    });
    await photo.save();

    return res.send(photo);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

photosRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if(photo === null) {
      return res.status(404).send({error: 'Photo not found'});
    }

    if(req.user?.role === 'admin' || (req.user?.role === 'user' && photo.user.equals(req.user._id))) {
      await Photo.deleteOne({_id: req.params.id});
      return res.send({message: 'Photo deleted successfully'});
    }

    return res.status(403).send({error: 'You cannot delete this photo'});
  } catch (error) {
    return next(error);
  }
});

export default photosRouter;
