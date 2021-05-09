import React from 'react';

class Employees extends React.Component {
    render() {
        return (
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col">ID</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col" >Department Id</th>
                        <th scope="col">Job title</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Day of birth</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employees &&
                        this.props.employees.length > 0 &&
                        this.props.employees.map((employee, i) => {
                            return (
                                <tr className="text-center" key={i}>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.departmentId}</td>
                                    <td>{employee.jobTitle}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.dateOfBirth}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        );
    }
}

export default Employees;