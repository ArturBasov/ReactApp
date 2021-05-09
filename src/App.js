import React from 'react';
import Employees from './components/employees';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      employeeId: "",
      firstName: "",
      lastName: "",
      departmentId: "",
      jobTitle: "",
      gender: "",
      dateOfBirth: ""
    };
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  employeeField = ({ id: fieldName, label }) => {
    return <label htmlFor={fieldName}>
      {label}:
      <input
        name={fieldName}
        id="name"
        type="text"
        className="form-control"
        value={this.state.fieldName}
        onChange={e =>
          this.handleChange({
            [`${fieldName}`]: e.target.value,
          })
        }
        required
      />
    </label>
  }

  componentDidMount() {
    // get all entities - GET
    fetch("http://localhost:8080/api/employees", {
      method: "GET"

    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        return this.setState({
          employees: response,
        });
      })
      .catch((err) => {
      });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();
    // creates entity
    fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        departmentId: this.state.departmentId,
        jobTitle: this.state.jobTitle,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth
      }),
    })
      .then((response) => window.location.reload(true))
      .catch((err) => {
      });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();
    // this will update entries with PUT
    fetch(
      `http://localhost:8080/api/employees`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        employeeId: this.state.employeeId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        departmentId: this.state.departmentId,
        jobTitle: this.state.jobTitle,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth,
      }),
    })
      .then((response) => window.location.reload(true))
      .catch((err) => {
      });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(
      `http://localhost:8080/api/employees/${this.state.employeeId}`, {
      method: "DELETE"
    }
    )
      .then((response) => window.location.reload(true))
      .catch((err) => {
      });
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleOptionChange(changeEvent) {
    this.setState({
      gender: changeEvent.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 text-center">Employees data</h1>
            <form className="d-flex flex-column">
              <legend className="text-center">Create-Read-Update-Delete Employee</legend>
              {this.employeeField({ id: 'employeeId', label: 'Employee ID' })}
              {this.employeeField({ id: 'firstName', label: 'Employee First Name' })}
              {this.employeeField({ id: 'lastName', label: 'Employee Last Name' })}
              {this.employeeField({ id: 'departmentId', label: 'Department Id' })}
              {this.employeeField({ id: 'jobTitle', label: 'Job title' })}
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="MALE" id="inlineRadio1" checked={this.state.gender === 'MALE'} onChange={this.handleOptionChange} />
                <label className="form-check-label" htmlFor="inlineRadio1">MALE</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="FEMALE" id="inlineRadio2" checked={this.state.gender === 'FEMALE'} onChange={this.handleOptionChange} />
                <label className="form-check-label" htmlFor="inlineRadio2">FEMALE</label>
              </div>
              {this.employeeField({ id: 'dateOfBirth', label: 'Date of birth' })}
              <button className="btn btn-primary" type="button" onClick={e => this.create(e)}>Add</button>
              <button className="btn btn-info" type="button" onClick={e => this.update(e)}>Update</button>
              <button className="btn btn-danger" type="button" onClick={e => this.delete(e)}>Delete</button>
            </form>
            <Employees employees={this.state.employees} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
