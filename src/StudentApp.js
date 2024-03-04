import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider, FieldArray, Field } from 'formik';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

function StudentRegistrationForm() {
    // State to hold student data fetched from the server
    const [studentData, setStudentData] = useState([]);
    // State to track the student ID being edited
    const [editingStudentId, setEditingStudentId] = useState(null);

    // Fetch student data when the component mounts
    useEffect(() => {
        fetchStudentData();
    }, []);

    // Function to fetch student data from the server
    const fetchStudentData = () => {
        axios.get("http://localhost:9090/studentsdata/getStudents")
            .then(response => {
                // Update student data state with the fetched data
                setStudentData(response.data.student);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Initial form values
    const initialValues = {
        students: [{
            studentName: '',
            fatherName: '',
            motherName: '',
            gender: 'M',
            caste: '',
            religion: '',
            address: ''
        }]
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        // Make a POST request to add a new student
        axios.post("http://localhost:9090/studentsdata/addStudent", values?.students[0])
            .then((res) => {
                if (res.data?.scode === '01') {
                    // Show an alert on successful submission
                    alert("submitted");
                    // Refresh student data after successful submission
                    fetchStudentData();
                }
            });
    };

    // Handle deletion of a student
    const handleDelete = (studentId) => {
        axios.delete(`http://localhost:9090/studentsdata/deleteStudent/${studentId}`)
            .then((res) => {
                // Show an alert on successful deletion
                alert("Student deleted successfully");
                // Refresh student data after deletion
                fetchStudentData();
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };

    // Handle update of a student
    const handleUpdate = (studentId) => {
        // Set the student ID being edited
        setEditingStudentId(studentId);
        // Additional logic for updating the student data can be implemented here
    };

    // Formik hook for handling form state
    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    return (
        <div className="registration-page">
            {/* FormikProvider to provide form state to child components */}
            <FormikProvider value={formik}>
                <Form>
                    {/* Form fields */}
                    <Table striped bordered hover>
                        <caption className="caption-heading">Student Registration Form</caption>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Father Name</th>
                                <th>Mother Name</th>
                                <th>Gender</th>
                                <th>Caste</th>
                                <th>Religion</th>
                                <th>Address</th>

                            </tr>
                        </thead>
                        <tbody>
                    <FieldArray name="students">
                        {arrayHelpers => (
                            <>
                                {formik.values.students.map((student, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                name={`students.${index}.studentName`}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type="text"
                                                name={`students.${index}.fatherName`}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type="text"
                                                name={`students.${index}.motherName`}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name={`students.${index}.gender`}
                                                value={student.gender} // Set the selected value
                                                onChange={formik.handleChange} // Formik will handle changes
                                                className="form-control"
                                            >
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                                <option value="O">Others</option>
                                            </select>
                                        </td>
                                        <td>
                                            <Field
                                                type="text"
                                                name={`students.${index}.caste`}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type="text"
                                                name={`students.${index}.religion`}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type="text"
                                                name={`students.${index}.address`}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </FieldArray>
                    </tbody>
                    <Button type="submit" disabled={formik.isSubmitting}>
                        Submit
                    </Button>
                    </Table>
                </Form>
            </FormikProvider>

            <Table striped bordered hover>
                <caption className="caption-heading">Student Data</caption>
                <thead>
                    <tr>
                        {/* Table headers */}
                        <th>Serial No</th>
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>Father Name</th>
                        <th>Mother Name</th>
                        <th>Gender</th>
                        <th>Caste</th>
                        <th>Religion</th>
                        <th>Address</th>
                        <th>Actions</th> {/* Actions column for delete and update buttons */}
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping over student data to display rows */}
                    {console.log("Type of studentData:", typeof studentData)}
                    {studentData.map((student, index) => (
                        <tr key={index}>
                            {/* Displaying student details */}
                            <td>{student.serialNo}</td>
                            <td>{student.studentId}</td>
                            <td>{student.studentName}</td>
                            <td>{student.fatherName}</td>
                            <td>{student.motherName}</td>
                            <td>{student.gender}</td>
                            <td>{student.caste}</td>
                            <td>{student.religion}</td>
                            <td>{student.address}</td>
                            <td>
                                {/* Delete button with corresponding functionality */}
                                <Button onClick={() => handleDelete(student.id)}>Delete</Button>
                                {/* Update button with corresponding functionality */}
                                <Button onClick={() => handleUpdate(student.id)}>Update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default StudentRegistrationForm;
