import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as bie from 'react-bootstrap';

export default function StudentRegistrationForm() {
    return (
        <div className="registration-page"> {/* Add class name to the outer div */}
            <Formik
                initialValues={{
                    studentName: '',
                    fatherName: '',
                    motherName: '',
                    gender: '',
                    caste: '',
                    religion: '',
                    address: '',
                    qualification1: false,
                    qualification2: false,
                    qualification3: false,
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = {
                        ...values,
                        qualification1: values.qualification1 ? 'SSC' : '',
                        qualification2: values.qualification2 ? 'INTER' : '',
                        qualification3: values.qualification3 ? 'DEGREE' : '',
                    };

                    axios
                        .post('http://localhost:9090/students/addStudent', formData)
                        .then((res) => {
                            if (res.data?.scode === '01') {
                                alert('Successfully submitted');
                            } else if (res.data?.scode === '02') {
                                alert('No Data Found');
                            }
                            setSubmitting(false);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            alert('An error occurred while submitting the form.');
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <bie.Container className="outer-page-content-container">
                            <bie.Row>
                                <bie.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <div className="page-titlespacing inner-herbpage-service-title1">
                                        <h1 style={{ color: '#0352fc' }}>Student Registration Form</h1>
                                    </div>
                                </bie.Col>
                            </bie.Row>

                            <bie.Row>
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <span className="text-danger">
                                        *<b>Student Name:</b>
                                    </span>
                                    <Field type="text" name="studentName" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <span className="text-danger">
                                        *<b>Father Name:</b>
                                    </span>
                                    <Field type="text" name="fatherName" className="form-control" />
                                    <ErrorMessage name="fatherName" component="div" className="text-error" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row>
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <span className="text-danger">
                                        *<b>Mother Name:</b>
                                    </span>
                                    <Field type="text" name="motherName" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2 align-items-center">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <span className="text-danger">
                                        *<b>Gender:</b>
                                    </span>
                                    <div>
                                        <label className="radio-inline mr-3">
                                            <Field type="radio" name="gender" value="M" />
                                            Male
                                        </label>
                                        <label className="radio-inline mr-3">
                                            <Field type="radio" name="gender" value="F" />
                                            Female
                                        </label>
                                        <label className="radio-inline">
                                            <Field type="radio" name="gender" value="O" />
                                            Others
                                        </label>
                                        <ErrorMessage name="gender" component="div" className="text-error" />
                                    </div>
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                                    <span className="text-danger">
                                        *<b>Caste:</b>
                                    </span>
                                    <Field as="select" name="caste" className="form-control ml-2">
                                        <option value="">Select Caste</option>
                                        <option value="OC">OC</option>
                                        <option value="BC">BC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                        <option value="Others">Others</option>
                                    </Field>
                                    <ErrorMessage name="caste" component="div" className="text-error" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row>
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <span className="text-danger">
                                        *<b>Religion:</b>
                                    </span>
                                    <Field type="text" name="religion" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row>
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <span className="text-danger">
                                        *<b>Address:</b>
                                    </span>
                                    <Field type="text" name="address" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                                    <span className="text-danger">
                                        *<b>SSC:</b>
                                    </span>
                                    <Field type="checkbox" name="qualification1" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                                    <span className="text-danger">
                                        *<b>Inter:</b>
                                    </span>
                                    <Field type="checkbox" name="qualification2" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                                    <span className="text-danger">
                                        *<b>Under Graduate:</b>
                                    </span>
                                    <Field type="checkbox" name="qualification3" className="form-control" />
                                </bie.Col>
                            </bie.Row>

                            <bie.Row className="px-5 pt-2">
                                <bie.Col xs={12} sm={12} md={12} lg={8} xl={2} xxl={2}>
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </bie.Col>
                            </bie.Row>
                        </bie.Container>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
