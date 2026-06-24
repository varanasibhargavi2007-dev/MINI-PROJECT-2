const express = require("express");
const router = express.Router();
const College = require("../models/college");

// CREATE a new college
router.post("/", async (req, res) => {
  try {
    const college = new College(req.body);
    const savedCollege = await college.save();

    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// READ all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();

    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// READ a single college by ID
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE a college by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCollege) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.status(200).json(updatedCollege);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE a college by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCollege = await College.findByIdAndDelete(req.params.id);

    if (!deletedCollege) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.status(200).json({
      message: "College deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
