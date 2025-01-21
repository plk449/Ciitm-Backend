import Course from '../models/Create_Course.model.js';

export let Create_Course = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      courseDuration,
      coursePrice,
      courseCode,
    } = req.body;

    let FindCourse = await Course.findOne({ courseName: courseName });

    if (FindCourse) {
      return res
        .status(400)
        .json({ message: 'Course already exists', error: true });
    }

    let Created_Course = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      courseDuration: courseDuration.toNumber(),
      coursePrice: coursePrice,
      courseCode: courseCode,
    });

    if (!Create_Course) {
      return res
        .status(400)
        .json({ message: 'Course not created', error: true });
    }

    return res.status(400).json({
      Create_Course: Created_Course,
      created: true,
      message: 'Course not created',
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || 'Course not created', error: true });
  }
};
