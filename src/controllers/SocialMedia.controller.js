import logger from '../middleware/loggerMiddleware.js';
import socialMedia from '../models/Social_Media.model.js';

export let Create_Social_Link = async (req, res) => {
  let { linkedin, facebook, instagram, email, Number } = req.body;

  let FindSocial_link = await socialMedia.findOne();

  if (FindSocial_link) {
    return res.status(200).json({
      message: 'Social Media Link already exists',
      error: true,
      link: FindSocial_link,
    });
  }

  let Created_Link = await socialMedia.create({
    linkedin: linkedin,
    facebook: facebook,
    instagram: instagram,
    email: email,
    number: Number,
  });

  if (!Created_Link) {
    return res.status(400).json({
      message: 'Failed to Create Social Media Link',
      error: true,
    });
  }

  return res.status(201).json({
    message: 'Link Created Successfully',
    success: true,
    Created_Link,
  });
};

export let Find_Social_link = async (req, res) => {
  try {
    let FindSocial_link = await socialMedia.findOne();

    if (!FindSocial_link) {
      return res.status(404).json({
        message: 'Failed to Find Social Media Link',
        find_link: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Got the Social Media Link',
      success: true,
      link: FindSocial_link,
    });
  } catch (error) {
    return res.status(error.status || 403).json({
      message: error.message || 'Failed to Find Social Media Link',
      error: true,
    });
  }
};

export let Edit_Social_link = async (req, res) => {
  try {
    let { linkedin, facebook, instagram, email, Number } = req.body;

    if (isNaN(Number)) {
      return res.status(400).json({
        message: 'Invalid Number',
        error: true,
      });
    }

    let FindSocial_link = await socialMedia.findOne();

    if (!FindSocial_link) {
      return res.status(400).json({
        message: 'Failed to Find Social Media Link',
        find_link: false,
        error: true,
      });
    }

    let Edit_Link = await socialMedia.findByIdAndUpdate(
      { _id: FindSocial_link._id },
      {
        $set: {
          linkedin: linkedin,
          facebook: facebook,
          instagram: instagram,
          email: email,
          number: Number,
        },
      },

      {
        new: true,
      }
    );
    if (!Edit_Link) {
      return res.status(404).json({
        message: 'Failed to Update Link',
        update_link: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Link Updated',
      success: true,
      link: Edit_Link,
    });
  } catch (error) {
    logger.error({ error }, 'Error in Edit_Social_link');
    return res.status(error.status || 403).json({
      message: error.message || 'Failed to Find Social Media Link',
      error: true,
    });
  }
};
