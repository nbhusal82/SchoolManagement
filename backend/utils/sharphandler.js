import sharp from "sharp";
import { removeimg } from "./removeimg.js";

export const compressImg = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize({ width: 1000 })
      .jpeg({ quality: 100 })
      .toFile(outputPath);
    await removeimg(inputPath);
    return outputPath;
  } catch (error) {
    console.error("sharp error", error);
  }
};
