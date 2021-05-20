class Exam {
  
  constructor(coursecode, score, date) {
    this.coursecode = coursecode;
    this.score = score;
    this.date = date;
  }

  static from(json) {
    return new Exam(json.code, json.score, json.date);
  }
}

export default Exam;