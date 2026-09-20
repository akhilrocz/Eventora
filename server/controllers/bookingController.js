const Booking = require("../models/Booking");
const Event = require("../models/Event");
const OTP = require("../models/OTP");
const { sendBookingEmail, sendOTPEmail } = require("../utils/email");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.sendBookingOTP = async (req, res) => {
  try {
    const otp = generateOTP();
    await OTP.findOneAndDelete({
      email: req.user.email,
      action: "event_booking",
    });
    await OTP.create({ email: req.user.email, otp, action: "event_booking" });
    await sendOTPEmail(req.user.email, otp, "event_booking");
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

exports.bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;

    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      eventId,
      status: { $ne: "cancelled" },
    });

    if (existingBooking)
      return res.status(400).json({ message: "Already booked or pending" });

    // Verify OTP explicitly before proceeding
    const validOTP = await OTP.findOneAndDelete({
      email: req.user.email,
      otp,
      action: "event_booking",
    });
    if (!validOTP) {
      return res
        .status(400)
        .json({ message: "Invalid or expired OTP for booking" });
    }

    const event = await Event.findOneAndUpdate(
      { _id: eventId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { new: true },
    );
    if (!event) {
      const exists = await Event.exists({ _id: eventId });
      return exists
        ? res.status(409).json({ message: "No seats available" })
        : res.status(404).json({ message: "Event not found" });
    }

    try {
      const booking = await Booking.create({
        userId: req.user.id,
        eventId,
        status: "pending",
        paymentStatus: "not_paid",
        amount: event.ticketPrice,
      });

      res.status(201).json({ message: "Booking request submitted", booking });
    } catch (error) {
      await Event.updateOne({ _id: eventId }, { $inc: { availableSeats: 1 } });
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { paymentStatus } = req.body; // 'paid' or 'not_paid'
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, status: "pending" },
      { status: "confirmed", ...(paymentStatus && { paymentStatus }) },
      { new: true },
    )
      .populate("userId")
      .populate("eventId");

    if (!booking)
      return res
        .status(409)
        .json({ message: "Booking not found or not pending" });

    try {
      // Send email on admin confirmation
      await sendBookingEmail(
        booking.userId.email,
        booking.userId.name,
        booking.eventId.title,
      );
    } catch (emailError) {
      console.error("Confirmation email failed:", emailError.message);
    }
    res.json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings =
      req.user.role === "admin"
        ? await Booking.find()
            .populate("eventId")
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
        : await Booking.find({ userId: req.user.id })
            .populate("eventId")
            .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Only one request can flip an active booking to cancelled
    const cancelled = await Booking.findOneAndUpdate(
      { _id: req.params.id, status: { $in: ["pending", "confirmed"] } },
      { status: "cancelled" },
    );
    if (!cancelled)
      return res.status(400).json({ message: "Already cancelled" });

    // Both pending and confirmed bookings hold a seat, so release it (exactly once)
    await Event.updateOne(
      { _id: cancelled.eventId },
      { $inc: { availableSeats: 1 } },
    );

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
