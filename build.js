const { join } = require("path");
const { ensureDir, copyFile } = require("fs-extra");

const fileName = "Swiip.jpg";
const distPath = join(__dirname, "dist");
const sourcePath = join(__dirname, fileName);
const destPath = join(distPath, fileName);

const run = async () => {
  await ensureDir(distPath);
  await copyFile(sourcePath, destPath);
};

run();
