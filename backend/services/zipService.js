import archiver from "archiver";
import fs from "fs";
import path from "path";

export const createZip = (folderPath, id) => {
  return new Promise((resolve, reject) => {
    const zipPath = path.join("temp", `${id}.zip`);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();

    output.on("close", () => resolve(zipPath));
    archive.on("error", reject);
  });
};