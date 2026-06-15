import express from 'express';
import messages from '../data/localMessages.js';

const router = express.Router();

// @desc    Fetch all support messages
// @route   GET /api/messages
// @access  Private/Admin
router.get('/', (req, res) => {
  try {
    // Sort messages by most recent date
    const sortedMessages = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sortedMessages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error loading messages' });
  }
});

// @desc    Submit a new contact message
// @route   POST /api/messages
// @access  Public
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const newMessage = {
      id: 'msg' + (messages.length + 1),
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      date: new Date().toISOString(),
      status: 'Unread'
    };
    
    messages.push(newMessage);
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error sending message' });
  }
});

// @desc    Update message status and add reply
// @route   PUT /api/messages/:id
// @access  Private/Admin
router.put('/:id', (req, res) => {
  try {
    const { status, reply } = req.body;
    const msgIndex = messages.findIndex(m => m.id === req.params.id);
    
    if (msgIndex !== -1) {
      messages[msgIndex].status = status || messages[msgIndex].status;
      if (reply) {
        messages[msgIndex].reply = reply;
        messages[msgIndex].replyDate = new Date().toISOString();
        // Here you would typically integrate with nodemailer or SendGrid to send the actual email
        console.log(`Sending email to ${messages[msgIndex].email}: ${reply}`);
      }
      res.json(messages[msgIndex]);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating message' });
  }
});

export default router;
