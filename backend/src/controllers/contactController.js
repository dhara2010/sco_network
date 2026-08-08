const ContactInquiry = require('../models/ContactInquiry');

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.submitInquiry = async (req, res) => {
  try {
    const newInquiry = new ContactInquiry(req.body);
    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await ContactInquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    await ContactInquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
