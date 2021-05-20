import Exam from './models/Exam';
import Course from './models/Course';

async function getAllCourses() {
  // call GET /api/courses
  const response = await fetch('/api/courses');
  const courseJson = await response.json();
  if(response.ok)
    return courseJson.map((co) => Course.from(co));
  else
    throw courseJson;
};

async function getAllExams() {
  // call GET /api/exams
  const response = await fetch('/api/exams');
  const examsJson = await response.json();
  if(response.ok)
    return examsJson.map((ex) => Exam.from(ex));
  else
    throw examsJson;
}

function addExam(exam) {
  // call POST /api/exams
  return new Promise((resolve, reject) => {
    fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({code: exam.coursecode, score: exam.score, date: exam.date})
    }).then((response)=> {
      if(response.ok) {
        resolve(null);
      }
      else {
        // analyze and return the error
        // TODO: complete the error handling
        response.json()
          .then((obj)=> { reject(obj); })
          //...
      }
    }).catch(err => { reject({'error': 'Cannot communicate with the server'})});
  });
}

function deleteExam(coursecode) {
  return new Promise((resolve, reject) => {
    fetch('/api/exams/' + coursecode, {
      method: 'DELETE'
    }).then((response)=> {
      if(response.ok) {
        resolve(null);
      }
      else {
        // analyze and return the error
        // TODO: complete the error handling
        response.json()
          .then((obj)=> { reject(obj); })
          //...
      }
    }).catch(err => { reject({'error': 'Cannot communicate with the server'})});
  });
}

const API = {getAllCourses, getAllExams, addExam, deleteExam};
export default API;