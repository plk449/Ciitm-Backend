import contactSchema from '../models/contact.model.js';
import courseSchemaJoi from '../validation/contactValidation.js';

export const Handle_ContactForm = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const { cName, cEmail, cNumber, cMessage, cCountry } = req.body;
    console.log('Received data: 2', cName, cEmail, cNumber, cMessage, cCountry);
    const { error } = courseSchemaJoi.validate(req.body);

    if (error) {
      console.error('Validation Error Stack:', error.stack);

      return res.status(400).json({
        message: error.details[0].message, // Specific validation message
        error: true,
        details: error.details, // Detailed error information
      });
    }

    const createdForm = await contactSchema.create({
      cName,
      cEmail,
      cCountry,
      cNumber,
      cMessage,
    });

    res.status(200).json({
      message:
        'We’ve received your form. Our team will review your query and get back to you as soon as possible. 😊',
      data: createdForm,
    });
  } catch (error) {
    // Log the error message for debugging
    console.error('Error:', error.message);

    // Send an error response
    res.status(error.status || 500).json({
      message: error.message,
      error: true,
    });
  }
};

// Retrieve All Contact Form Data from DataBase
export const get_FormData = async (req, res) => {
  try {
    let perPage = parseInt(req.query.page) || 1;
    let limit = 5;

    const contactData = await contactSchema
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((perPage - 1) * limit);

    if (contactData.length === 0) {
      res.status(404).json({
        message: 'No Contact Data Found in Database',
      });
    } else {
      res.json(contactData);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

// Delete Single Contact Form on the basic of ID.
export const delete_FormData = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMessage = await contactSchema.findByIdAndDelete(id);

    if (!deleteMessage) {
      res.status(404).json({
        message: 'Message Not Found 😥😥',
        error: true,
      });
    } else {
      res.json({
        deleteMessage,
        message: 'Form Message deleted successfully ❌',
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

// View Single Contact Form n the basic of ID.
export const view_FormData = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    if (!id) {
      return res.status(404).json({
        message: 'Please Provide Message Id',
        error: true,
      });
    }

    const formData = await contactSchema.findById(id);

    if (!formData) {
      let error = Error();
      error.message = 'Invalid Message Id';
      error.status = 404;
      throw error;
    }

    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
