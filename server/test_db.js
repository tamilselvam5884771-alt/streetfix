import dotenv from 'dotenv';
const result = dotenv.config();
console.log("Dotenv result:", result);
console.log("URI:", process.env.MONGODB_URI);
console.log("FULL:", `${process.env.MONGODB_URI}/mern-auth`);
