const fs = require("fs");

const categories = fs.readdirSync(`./languages/en-GB/`);
const output = [];

categories.forEach((category) => {
  const files = fs
    .readdirSync(`./languages/en-GB/${category}/`)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const fileContent = require(`./languages/en-GB/${category}/${file}`);

    if (category !== "common") {
      output.push({
        name:
          file.replace(".json", "").charAt(0).toUpperCase() +
          file.replace(".json", "").slice(1),
        category:
          category.replace(".json", "").charAt(0).toUpperCase() +
          category.replace(".json", "").slice(1),
        description: fileContent["description"] || [
          "Unable to find command description...",
        ],
        usage: fileContent["usage"] || [
          "Somethings wrong, I can't find any usage. Can you help me?",
        ],
      });
    }
  }
});

fs.writeFileSync(
  `./commands.json`,
  JSON.stringify(
    output.sort((a, b) => a?.name?.localeCompare(b?.name)),
    null,
    2
  ).replace(/`/g, ""),
  "utf-8"
);
