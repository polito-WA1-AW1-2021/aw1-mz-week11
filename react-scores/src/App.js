import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import {ExamScores, ExamForm} from './ExamComponents.js';
import AppTitle from './AppTitle.js';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import API from './API';

function App() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      const courses = await API.getAllCourses();
      setCourses(courses);
    }
    getCourses();
  }, []);

  useEffect(() => {
    const getExams = async () => {
      const exams = await API.getAllExams();
      setExams(exams);
    }
    if(courses.length && dirty) {
      getExams().then(()=> {
        setLoading(false);
        setDirty(false);
      });
    }
  }, [courses.length, dirty]);
  
  const examCodes = exams.map(exam => exam.coursecode) ;

  const deleteExam = (coursecode) => {
    // set temporary state for the deleted exam
    setExams(oldExams => {
      return oldExams.map(ex => {
        if (ex.coursecode === coursecode)
          return {...ex, status: 'deleted'};
        else
          return ex;
      });
    });

    API.deleteExam(coursecode)
      .then(()=> { setDirty(true); });
  }

  const addExam = (exam) => {
    exam.status = 'added';
    setExams(oldExams => [...oldExams, exam]);

    API.addExam(exam)
      .then(()=> { setDirty(true); });
      //.catch(...);
  }

  const updateExam = (exam) => {
    setExams(oldExams => {
      return oldExams.map(ex => {
        if (ex.coursecode === exam.coursecode)
          return {coursecode: exam.coursecode, score: exam.score, date: exam.date};
        else
          return ex;
      });
    });
  }

  return (<Router>
    <Container className="App">
      <Row>
        <AppTitle />
      </Row>

      <Switch>
        <Route path="/add" render={() => 
          <ExamForm courses={courses.filter(course => !examCodes.includes(course.coursecode))} addOrUpdateExam={addExam}></ExamForm>
        }/>

        <Route path="/update" render={() => 
          <ExamForm courses={courses} addOrUpdateExam={updateExam}></ExamForm>
        }/>

        <Route path="/" render={() => 
          <Row>
            {loading ? <p>Please wait, loading your exams...</p>:
            <ExamScores exams={exams} courses={courses} deleteExam={deleteExam}/> }
          </Row>
        } />
        
      </Switch>
    </Container>
  </Router>);
}

export default App;
