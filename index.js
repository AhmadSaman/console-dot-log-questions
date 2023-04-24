const fs = require("fs");

fs.readFile("./a-questions.md", "utf8", (err, data) => {
  if (err) throw err;
  const contentArray = data.split("---");

  contentArray.forEach((content, index) => {
    const newFilePath = `./questions/a-${index}.md`;

    const lines = content.split("\n");
    const filteredLines = lines.map((line) => {
      if (line.startsWith("#####")) {
        const newline = line.split(".");
        return `#### ${newline[1]}`;
      } else {
        return line;
      }
    });
    const filteredLines2 = filteredLines.join("\n");
    const filteredLines3 = filteredLines2.split("<details>");
    const lines2 = filteredLines3[1].split("\n");
    const filteredLines4 = lines2.filter((line) =>
      line.startsWith("#### Answer")
    );
    const filteredLines5 = filteredLines4[0].split(" ")[2].split("\r")[0];

    console.log(filteredLines5);
    const readyContent = `---\ntitle: "${filteredLines5}"\n---
    `.concat(filteredLines3[0]);

    fs.writeFile(newFilePath, readyContent, (err) => {
      if (err) throw err;
      console.log(`File ${newFilePath} has been created!`);
    });
  });
});
