import React from 'react';
import { useFormik, Form, FormikProvider, FieldArray , Field} from 'formik';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

function StudentRegistrationForm() {

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

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        axios.post("http://localhost:9090/studentsdata/addStudent", values?.students[0]).then((res) => {
            if (res.data?.scode === '01') {
                alert("submitted")
            }
        })


    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    });

    return (
        <div className="registration-page">
            <FormikProvider value={formik}>
                <Form>
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
                                                        // value={student.fatherName} we should not use this as we are directly specifing the values
                                                        // so to set the values we follow the below method
                                                        //response.data?.map((d, i) => {
                                                        // formik.setFieldValue("studentName", d.studentName);
                                                        //formik.setFieldValue("fatherName", d.fatherName);
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
                    </Table>
                    <Button type="submit" disabled={formik.isSubmitting}>
                        Submit
                    </Button>
                </Form>
            </FormikProvider>
        </div>
    );
}
