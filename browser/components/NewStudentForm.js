/* eslint-disable react/jsx-child-element-spacing */
import React, { Component } from 'react';
import axios from 'axios';

export default class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const {data} = await axios.post('/',
        {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email});
      this.props.CreateStudent(data);
      this.setState({
        firstname: '',
        lastname: '',
        email: ''
      });

    } catch (error) {
      console.log(error);
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
