const router = require('express').Router();
const Student = require('../db/models/students');
const Test = require('../db/models/tests');

router.get('/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      if (!student) return res.sendStatus(404);
      res.json(student);
    })
    .catch(next);
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);

    await Test.create({
      subject: 'Singing',
      grade: 99,
      studentId: newStudent.id
    });

    // if we were to hardcode the eagerloading

    // const foundStudent = await Student.findByPk(newStudent.id, {
    //   include: {
    //     model: Test
    //   }
    // });
    // res.status(201).json(foundStudent);
    if (newStudent) {
      res.status(201).json(newStudent);
    } else {
      res.status(404).send('Something went wrong!');
    }
  } catch (error) {
    next(error);
  }
})

router.get('/', function(req, res, next) {
  Student.findAll({ include: { all: true } }).then(students =>
    res.json(students)
  );
});

router.put('/:id', function(req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(test => res.status(201).json(test[1][0]))
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
