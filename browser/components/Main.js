/* eslint-disable react/button-has-type */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      toggleForm: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  createStudent(student) {
    this.setSetate({
      students: [...this.state.students, student]
    });
  }

  handleClick() {
   this.setState({
     toggleForm: !this.state.toggleForm
   });
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Submit Student</button>
        {
          this.state.toggleForm ? <NewStudentForm createStudent={this.createStudent} /> : null
        }
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
