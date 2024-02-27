import { useState } from 'react';
import { Formik, Form, Field, FieldArray, FormikProvider } from 'formik';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

export default function StudentRegistrationForm() {
    const initialValues = {
        students: [{
            studentName: '',
            fatherName: '',
            motherName: '',
            gender: '',
            caste: '',
            religion: '',
            address: '',
            qualifications: []  // To hold multiple qualifications
        }]
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values)
        try {
            const response = await axios.post('http://localhost:9090/students/addStudent', values);
            if (response.data?.scode === '01') {
                alert('Successfully submitted');
            } else if (response.data?.scode === '02') {
                alert('No Data Found');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="registration-page">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <Form>
                        <FormikProvider value={formikProps}>
                            <FieldArray name="students">
                                {arrayHelpers => (
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
                                                <th>Qualifications</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formikProps.values.students.map((student, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Field type="text" name={`students.${index}.studentName`} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <Field type="text" name={`students.${index}.fatherName`} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <Field type="text" name={`students.${index}.motherName`} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <Field as="select" name={`students.${index}.gender`} className="form-control" value={formikProps.values.students[index].gender}>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>
                                                            <option value="O">Others</option>
                                                        </Field>
                                                    </td>
                                                    <td>
                                                        <Field type="text" name={`students.${index}.caste`} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <Field type="text" name={`students.${index}.religion`} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <Field type="text" name={`students.${index}.address`} className="form-control" />
                                                    </td>
                                                    <td>
                                                        <label>
                                                            <Field type="checkbox" name={`students.${index}.qualifications`} value="SSC" /> SSC
                                                        </label>
                                                        <label>
                                                            <Field type="checkbox" name={`students.${index}.qualifications`} value="INTER" /> Inter
                                                        </label>
                                                        <label>
                                                            <Field type="checkbox" name={`students.${index}.qualifications`} value="DEGREE" /> Degree
                                                        </label>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </FieldArray>
                            <Button type="submit" disabled={formikProps.isSubmitting}>
                                Submit
                            </Button>
                        </FormikProvider>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
