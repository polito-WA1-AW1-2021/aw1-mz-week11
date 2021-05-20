class Course {
  
  constructor(coursecode, name, CFU) {
    this.coursecode = coursecode;
    this.name = name;
    this.CFU = CFU;
  }

  static from(json) {
    return new Course(json.code, json.name, json.CFU);
  }
}

export default Course;