const express = require('express');
const cors = require('cors');

const app = express();
const port = 3200;
let students = [
  {
    id: 1,
    name: 'Amanda Rich',
    school: 'UNB',
    birthdate: '09/07/2005'
  },
  {
    id: 2,
    name: 'Jhon Ferdinand',
    school: 'UFG',
    birthdate: '09/07/2002'
  }
];

app.use(express.json());
app.use(cors());

app.get('/students', (req, res) => {
  const q = req.query;
  let result = students;

  for (const key of Object.keys(q)) {
    result = result
      .filter(r => String(r[key]) === q[key]);
  }

  return res.status(200).json(result);
});

app.post('/students', (req, res) => {
  const { name, birthdate, school } = req.body;
  const student = {
    id: new Date().getTime(),
    name,
    birthdate,
    school
  };

  students.push(student);

  return res.status(201).send();
});

app.patch('/students/:id', (req, res) => {
  const { name, birthdate, school } = req.body;
  const { id } = req.params;

  const index = students.findIndex(s => s.id === id);

  students[index] = {
    ...students[index],
    name,
    birthdate,
    school,
    updated_at: new Date()
  };

  return res.status(203).json(students);
});


app.delete('/students/:id', (req, res) => {
  const { id } = req.params;

  students = students.filter(s => s.id !== id);

  return res.status(204).json(students);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`app up and running on port ${port}`);
});
