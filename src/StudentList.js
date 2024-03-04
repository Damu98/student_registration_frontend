import React from 'react';

function StudentList({ students, handleEdit, handleDelete }) {

    if (!students) {
        return <div>Loading...</div>;
    }
    return (
        <div className="student-list">
            <h2>Student List</h2>
            {students.length === 0 ? (
                <p>No students found</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Student Name</th>
                            <th>Father Name</th>
                            <th>Mother Name</th>
                            <th>Gender</th>
                            <th>Caste</th>
                            <th>Religion</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.serialNo}</td>
                                <td>{student.studentName}</td>
                                <td>{student.fatherName}</td>
                                <td>{student.motherName}</td>
                                <td>{student.gender}</td>
                                <td>{student.caste}</td>
                                <td>{student.religion}</td>
                                <td>{student.address}</td>
                                <td>
                                    <button onClick={() => handleEdit(student.studentId)}>Edit</button>
                                    <button onClick={() => handleDelete(student.studentId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StudentList;
