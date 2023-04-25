const fs = require("fs");

const GenerateAlphaQuestions = fs.readFile(
  "./a-questions.md",
  "utf8",
  (err, data) => {
    if (err) throw err;
    // there is "---" between each question inside ./a-questions.md
    const contentArray = data.split("---");

    // will go through each of the questions and modify them to be valid MD file
    contentArray.forEach((content, index) => {
      const filePath = `./questions/a-${index}.md`;

      // split all the files with \n
      const lines = content.split("\n");
      // map through the question and delete question number(`##### 19. how are you ?` -> `##### how are you ?`) why? because will be easy for the user to cheat
      const newFileWithoutQuestionNumber = lines.map((line) => {
        if (line.startsWith("#####")) {
          const newline = line.split(".");
          return `#### ${newline[1]}`;
        } else {
          return line;
        }
      });
      const newFormattedQuestion = newFileWithoutQuestionNumber.join("\n");

      // inside the original file MD file(`a-question.md`) shows explanation for the answer the following logic will delete the explanation and get the answer inside it
      const splitQuestionAndExplanation =
        newFormattedQuestion.split("<details>");

      const explanation = splitQuestionAndExplanation[1];
      const question = splitQuestionAndExplanation[0];

      const lines2 = explanation.split("\n");
      // get the answer
      const AnswerLine = lines2.filter((line) =>
        line.startsWith("#### Answer")
      );
      const answer = AnswerLine[0].split(" ")[2].split("\r")[0];
      // add the answer as frontmatter to the MD file
      const readyContent = `---\nanswer: "${answer}"\n---
    `.concat(question);

      fs.writeFile(filePath, readyContent, (err) => {
        if (err) throw err;
        console.log(`File ${filePath} has been created!`);
      });
    });
  }
);

export default GenerateAlphaQuestions;
