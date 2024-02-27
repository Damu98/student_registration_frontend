import { useFormik, Form, FormikProvider, FieldArray } from 'formik';
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
        console.log(values);
        try {
            const response = await axios.post('http://localhost:9090/students/addStudent', values);
            if (response.data?.scode === '01') {
                const data = response.data; // Assuming response.data is an object
                formik.setFieldValue("studentName", data.studentName);
                formik.setFieldValue("fatherName", data.fatherName);
                formik.setFieldValue("motherName", data.motherName);
                formik.setFieldValue("gender", data.gender);
                formik.setFieldValue("caste", data.caste);
                formik.setFieldValue("religion", data.religion);
                formik.setFieldValue("address", data.address);
                formik.setFieldValue("qualifications", data.qualifications); // Adjust accordingly
                
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
                                <th>Qualifications</th>
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
                                                    <input
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
                                                    <input
                                                        type="text"
                                                        name={`students.${index}.motherName`}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        name={`students.${index}.gender`}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                    >
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                        <option value="O">Others</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name={`students.${index}.caste`}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name={`students.${index}.religion`}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name={`students.${index}.address`}
                                                        onChange={formik.handleChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name={`students.${index}.qualifications`}
                                                            // value="SSC"
                                                            checked={student.qualifications.includes('SSC')}
                                                            onChange={formik.handleChange}
                                                        /> SSC
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name={`students.${index}.qualifications`}
                                                            // value="INTER"
                                                            checked={student.qualifications.includes('INTER')}
                                                            onChange={formik.handleChange}
                                                        /> Inter
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            name={`students.${index}.qualifications`}
                                                            // value="DEGREE"
                                                            checked={student.qualifications.includes('DEGREE')}
                                                            onChange={formik.handleChange}
                                                        /> Degree
                                                    </label>
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
