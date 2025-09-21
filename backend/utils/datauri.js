import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) return null;  // agar file na mile to null bhej do

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString(); // e.g. ".png", ".jpg", ".pdf"
  
  return parser.format(extName, file.buffer); // { content: 'data:...base64...' }
};

export default getDataUri;
