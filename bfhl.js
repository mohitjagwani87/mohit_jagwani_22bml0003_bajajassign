const express = require("express");
const app = express();

app.use(express.json());

// Your existing logic...
const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

function isNumber(str) {
  return /^[0-9]+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function alternatingCapsReverse(str) {
  return str
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphabetsConcat = "";

    data.forEach(item => {
      if (isNumber(item)) {
        let num = parseInt(item, 10);
        (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        allAlphabetsConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(allAlphabetsConcat)
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// ✅ This is the important part for Vercel:
module.exports = app;
