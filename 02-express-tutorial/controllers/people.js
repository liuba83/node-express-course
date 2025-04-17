const { people } = require("../data");

const getPeople = (req, res) => {
  res.json({ people });
};

const addPerson = (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

const getPerson = (req, res) => {
  const idToFind = parseInt(req.params.id);
  const person = people.find((p) => p.id === idToFind);
  if (!person) {
    res.status(404).send("404 - Person Not Found");
  }
  res.json(person);
};

module.exports = { addPerson, getPeople, getPerson };
