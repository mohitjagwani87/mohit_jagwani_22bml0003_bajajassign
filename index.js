const express = require("express");
const app = express();

app.use(express.json());

const FULL_NAME= "john_doe";
const DOB= "17091999";   // ddmmyyyy format
const EMAIL= "john@xyz.com";
const ROLL_NUMBER= "ABCD123";
function isNumber(str){
  return /^[0-9]+$/.test(str);
}
function isAlphabet(str){
  return /^[a-zA-Z]+$/.test(str);
}
function isSpecialChar(str){
  return !isNumber(str) && !isAlphabet(str);
}

function alternatingCapsReverse(str){
  let chars = str.split("").reverse();
  return chars
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
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        allAlphabetsConcat += item;
      } else if (isSpecialChar(item)) {
        special_characters.push(item);
      }
    });
    const response ={
      is_success: true,
      user_id: ${FULL_NAME}_${DOB},
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(allAlphabetsConcat)
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
;
