const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // for hosting platforms

app.post('/bfhl', (req, res) => {
    const arr = req.body.array;
    if (!Array.isArray(arr)) {
        return res.status(400).json({ status: 'error', message: 'Input should be an array' });
    }

    const userId = "846384";
    const email = "mohitkumaremail.com";
    const rollNumber = "BML526";

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    arr.forEach(item => {
        if (typeof item === 'number') {
            if (item % 2 === 0) evenNumbers.push(item);
            else oddNumbers.push(item);
            sum += item;
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item.toUpperCase());
        } else {
            specialChars.push(item);
        }
    });

    let rev = alphabets.reverse().join('');
    let alternatingCaps = rev.split('').map((char, j) =>
        j % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    ).join('');

    return res.status(200).json({
        status: "success",
        userId,
        email,
        rollNumber,
        evenNumbers,
        oddNumbers,
        alphabets,
        specialChars,
        sum,
        alternatingCaps
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
