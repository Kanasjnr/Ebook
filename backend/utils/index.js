const jwt = require("jsonwebtoken");
const Ebook = require("../models/ebookModel")

const generateToken = (id) => {
  console.log("🔧 generateToken called with ID:", id);
  console.log("🔧 JWT_SECRET exists:", !!process.env.JWT_SECRET);
  console.log("🔧 JWT_SECRET length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
  
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log(" Token generation successful");
    return token;
  } catch (error) {
    console.error(" Token generation failed:", error.message);
    return null;
  }
};

const genrateUniqueId = async () => {
  const latestEbook = await Ebook.findOne().sort({ id: -1 }).lean();

  let newId = 1000;
  if (latestEbook && !isNaN(latestEbook.id)) {
    newId = parseInt(latestEbook.id) + 1;
  }
  return newId.toString();
};

module.exports = {
  generateToken,
  genrateUniqueId
};
