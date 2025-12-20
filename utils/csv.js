const { Parser } = require("json2csv");
const csv = require("csvtojson");

// JSON → CSV
exports.exportToCsv = (data, fields) => {
  const parser = new Parser({ fields });
  return parser.parse(data);
};

// CSV → JSON
exports.importFromCsv = async (filePath) => {
  return await csv().fromFile(filePath);
};
