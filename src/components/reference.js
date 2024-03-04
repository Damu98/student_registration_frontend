import { ErrorMessage, Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Header from '../../../../Header/Header'
import * as bie from "react-bootstrap"
import { allowAlphabetAndSpacesOnly } from '../../../../CommonUtils/CommonValidations';
import { BiTrash } from 'react-icons/bi';
import { VscDiffAdded } from 'react-icons/vsc';
import Swal from 'sweetalert2';
import { CommonAxiosGet, CommonAxiosPost } from '../../../../CommonUtils/CommonAxios';
import { Button, Col, Row, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as Yup from "yup";
 

function NewLessonPlans() {
  const formik = useFormik({
    initialValues: {
      lesson: [
        {
          year_name: '',
         // course_code: '',
         // course_name: '',
          year_code: '',
          sub_name: '',
          sub_code: '',
          month_code: '',
          month_name: '',
          chapter_no: '',
          chapter_name: '',
          no_of_periods: '',
          topic_name: '',
        },
      ],
    },
    validationSchema: Yup.object().shape({
      lesson: Yup.array().of(Yup.object().shape({
        year_name: Yup.string().required("Please Enter Year"),
       // course_name: Yup.string().required("Please Select Course"),
        sub_name: Yup.string().required("Please Select Subject"),
        month_name: Yup.string().required("Please Select Month"),
        chapter_no: Yup.string().required("Please Enter Chapter Number"),
        chapter_name: Yup.string().required("Please Enter Name"),
        no_of_periods: Yup.string().required("Please Enter No.Of.Periods"),
        topic_name: Yup.string().required("Please Enter Topic"),
      }))
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = values.lesson.map((exam) => ({
        //  course_code: exam.course_code,
        //  course_name: exam.course_name,
          year_name: exam.year_name,
          year_code: exam.year_code,
          sub_name: exam.sub_name,
          sub_code: exam.sub_code,
          month_code: exam.month_code,
          month_name: exam.month_name,
          chapter_no: exam.chapter_no,
          chapter_name: exam.chapter_name,
          no_of_periods: exam.no_of_periods,
          topic_name: exam.topic_name,
        }));
        
        let saveLessonsDetails="saveLessonsDetails";

        const response = await CommonAxiosPost(saveLessonsDetails, payload);

        if (response && response.data && response.data.scode === '01') {
          Swal.fire(response.data?.sdesc,'sucess')
          resetForm();      
          getdata();
        } else {
          console.error('API response is not as expected:', response);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
    },
  });

            const[getCourseName,setCourseName]=useState([])
            const [getcells, setCells] = useState([]);
            const [searchQuery, setSearchQuery] = useState('');
            const [filteredData, setFilteredData] = useState([]);
            const [getAllData,setAllData] = useState([]); 
            const [getselectedCourseName, setSelectedCourseName] = useState('');
          //  const [subDescOptions, setSubDescOptions] = useState([]);
          const [getsubName, setsubName] = useState([]);

            const formik2 = useFormik({
            });



            function getdata() {
               let editUrl="getAllLessons";
              CommonAxiosGet(editUrl).then((res) => {
                if(res.data.scode==="01"){
                  setAllData(res.data?.Syllabus)
                }
              });
            }

            useEffect(() => {
              getdata();
            }, []);
          
          {/*    function GetCourseName() {
                
                let editUrl="courseName";
                CommonAxiosGet(editUrl).then((res) => {
                if (res.data.scode === "01") {
                  const Syllabus = res.data.Syllabus || [];
                  const CourseNames = Syllabus.map((courseName) => {
                  const [cname, course_name] = courseName.cname.split('#,');
                    return { cname, course_name };
                  });
                  setCourseName(CourseNames);                
                }
              });
            }
           useEffect(() => {
            GetCourseName();
          }, []);
            
          function fetchSubDescOptions(courseName) {
            try {
                let editUrl = "getSubjectName/"+courseName;
                CommonAxiosGet(editUrl).then((res) => {
                    if (res.data.scode === "01") {
                        const subCodes = res.data.SubCodes || [];
                        const subDescs = subCodes.map((subCode) => {
                            const [scode, sub_desc] = subCode.scode.split('#,');
                            return { scode, sub_desc };
                        });
                        setSubDescOptions(subDescs);
                    } else {
                        console.error("Error fetching subject descriptions. API response:", res.data);
                    }
                });
            } catch (error) {
                console.error("Error fetching subject descriptions:", error);
            }
        }
        
      const handleCourseCodeChange = (event,index) => {
      const selectedCourseName = event.target.value;
      setSelectedCourseName(selectedCourseName);
      setSubDescOptions([]);
      const selectedCourse = getCourseName.find((course) => course.course_name === selectedCourseName);
       if (selectedCourse) {
        formik.setFieldValue(`lesson[${index}].course_name`, selectedCourse.course_name);
        formik.setFieldValue(`lesson[${index}].course_code`, selectedCourse.cname);
          fetchSubDescOptions(selectedCourseName);
        }
      };      */}


      function fetchSubName() {
            try {
                let editUrl = "getSubjectNameAndSubjectCode";
                CommonAxiosGet(editUrl).then((res) => {
                    if (res.data.scode === "01") {
                        const subCodes = res.data.SubCodes || [];
                        const subDescs = subCodes.map((subCode) => {
                            const [scode, sub_desc] = subCode.scode.split('#,');
                            return { scode, sub_desc };
                        });
                        setsubName(subDescs);
                    } else {
                        console.error("Error fetching subject descriptions. API response:", res.data);
                    }
                });
            } catch (error) {
                console.error("Error fetching subject descriptions:", error);
            }
        }


        useEffect(() => {
          fetchSubName();
        }, []);
              
      const handleSubjectNameChange = (event, index) => {
      const selectedSubjectName = event.target.value;

        formik.setFieldValue(`lesson[${index}].sub_name`, selectedSubjectName);

        const selectedSubCode = getsubName.find((option) => option.sub_desc === selectedSubjectName)?.scode;

        formik.setFieldValue(`lesson[${index}].sub_code`, selectedSubCode || "");
        };





        const handleYearChange = (e, index) => {
          const selectedYearName = e.target.value;
          let selectedYearCode;
        
          if (selectedYearName === "FIRST YEAR") {
            selectedYearCode = "1";
          } else if (selectedYearName === "SECOND YEAR") {
            selectedYearCode = "2";
          } else {
            selectedYearCode = ""; 
          }
        
          formik.setFieldValue(`lesson[${index}].year_name`, selectedYearName);
          formik.setFieldValue(`lesson[${index}].year_code`, selectedYearCode);
        };

        const handleMonthChange = (e, index) => {
          const selectedMonthName = e.target.value;
          const selectedMonthIndex = new Date(Date.parse(selectedMonthName + " 1, 2000")).getMonth() + 1;
          const selectedMonthCode = selectedMonthIndex.toString().padStart(2, '0');

          formik.setFieldValue(`lesson[${index}].month_name`, selectedMonthName);
          formik.setFieldValue(`lesson[${index}].month_code`, selectedMonthCode);
        }
        
       function deleteLession(topic_seq) {
          Swal.fire({
            text: "Do you want to delete?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
              let editUrl="deleteTheLesson/"+topic_seq;
              CommonAxiosPost(editUrl).then((res) => {
              if (res.data.scode === "01") {
                Swal.fire(res.data.sdesc, "", "info");
                getdata();
              } else {
                Swal.fire(res.data.sdesc, "", "info");
              }
            })
            .catch((error) => {
              console.error("Error deleting lesson:", error);
              Swal.fire("Error", "Failed to delete lesson", "error");
            });
            }
          });
        }
    
    const deleteButton = (row) => {
        return (
            <button
              type="button"
              className="btn btn-danger btn-sm ms-5"
              onClick={() => {
                  deleteLession(row.topic_seq);          
              }}
            >
              <BiTrash></BiTrash>
            </button>
        );
      };

      const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
      };

      const filterData = (data, searchQuery) =>
        data?.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    const filteredData1 = filterData(getAllData, searchQuery);
      
    const columns = [
    
        {
            dataField: "year_name",
            text: "Year",
            sort: true,
        },
        // {
        //     dataField: "course_name",
        //     text: "Course Name",
        //     sort: true,            
        // },
        {
            dataField: "sub_name",
            text: "Subject Name",
            sort: true,
        },
        {
            dataField: "sub_code",
            text: "Subject Code",
            sort: true,
        },
        
        {
            dataField: "month_name",
            text: "Month",
            sort: true,
        },
        {
          dataField: "chapter_no",
          text: "Chapter Number",
          sort: true,
      },
      {
        dataField: "chapter_name",
        text: "Chapter Name",
        sort: true,
      },
      {
        dataField: "no_of_periods",
        text: "No Of Periods",
        sort: true,
      },
      {
        dataField: "ac_year",
        text: "Acadamic Year",
        sort: true,
      },
      {
        dataField: "topic_name",
        text: "Topic Name",
        sort: true,
      },
      {
        dataField: "topic_seq",
        text: "Topic Sequence",
        sort: true,
      },
      {
        dataField: "delete",
        text: " Delete ",
        formatter: (cell, row) => deleteButton(row),
      },
      ];

    return (
        <div>
            <Header />
            <div className="main_section">  </div>
            <bie.Container>
                <bie.Row >
                    <bie.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="page-titlespacing">
                        <div className="inner-herbpage-service-title1">
                            <h1>Teacher Lesson Plan</h1>
                        </div>
                    </bie.Col>
                </bie.Row>
            </bie.Container>
            <bie.Container className="outer-page-content-container " >
            <FormikProvider value={formik}>
                <Form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                  <bie.Row>
            <bie.Col>
              <bie.Table className="table table-condensed table-bordered table-striped table-responsive  w-99">
                <thead>
                 
                  <tr>
                    <th>Year</th>
                {/*    <th>Course</th>  */}
                    <th>Subject</th>
                    <th>Month</th>
                    <th>Chapter Number</th>
                    <th>Chapter Name</th>
                    <th>No Of Periods</th>
                    <th>Topic Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
 
                <tbody>
                  <>
                  <FieldArray name="lesson">
                      {(formikDetails) => {
                        return formikDetails.form.values.lesson?.map(
                          (lesson, index) => {
                            return (
                              <>
                                <tr key={lesson.id}>
                               <td>
                                    <Field
                                      as="select"
                                      name={`lesson[${index}].year_name`}
                                      id={`lesson[${index}].year_name`}
                                      className="form-control"
                                      onChange={(e) => handleYearChange(e, index)}
                                      >
                                        <option value="">--Select Year--</option>
                                        <option value="FIRST YEAR">FIRST YEAR</option>
                                        <option value="SECOND YEAR">SECOND YEAR</option>
                                      </Field>
                                    <ErrorMessage
                                      name={`lesson[${index}].year_name`}
                                      component="div"
                                      className="text-error"
                                    ></ErrorMessage>
                                  </td>
 
                              {/*    <td>
                                      <Field
                                        as="select"
                                        name={`lesson[${index}].course_name`}
                                        id={`lesson[${index}].course_name`}
                                        className="form-control "
                                        onChange={(e) => {
                                          handleCourseCodeChange(e,index);
                                        }}
                                      >
                                        <option value="">--Select Course--</option>
                                        {getCourseName.map((course, index) => (
                                          <option key={index} value={course.course_name}>
                                            {course.course_name}
                                          </option>
                                        ))}
                                      </Field>
                                      <ErrorMessage
                                        name={`lesson[${index}].course_name`}
                                        component="div"
                                        className="text-error"
                                      ></ErrorMessage>
                                        </td>    */}


                                    <td>
                                      <Field
                                        as="select"
                                        className="form-control"
                                        name={`lesson[${index}].sub_name`}
                                        id={`lesson[${index}].sub_name`}
                                        onChange={(e) => {
                                          handleSubjectNameChange(e, index);
                                        }}
                                      >
                                        <option value="">--Select Subject--</option>
                                        {Array.isArray(getsubName) ? (
                                          getsubName.map((option) => (
                                            <option key={option.scode} value={option.sub_desc}>
                                              {option.sub_desc}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="">No subjects available</option>
                                        )}
                                      </Field>
                                      <ErrorMessage
                                        name={`lesson[${index}].sub_name`}
                                        component="div"
                                        className="text-error"
                                      ></ErrorMessage>
                                    </td>
                                  <td>
                                    <Field
                                      as="select"
                                      name={`lesson[${index}].month_name`}
                                      id={`lesson[${index}].month_name`}
                                      className="form-control"
                                      onChange={(e) => {
                                        handleMonthChange(e, index);
                                      }}
                                    >
                                      <option value="">--Select Month Name--</option>
                                      <option value="January">January</option>
                                      <option value="February">February</option>
                                      <option value="March">March</option>
                                      <option value="April">April</option>
                                      <option value="May">May</option>
                                      <option value="June">June</option>
                                      <option value="July">July</option>
                                      <option value="August">August</option>
                                      <option value="September">September</option>
                                      <option value="October">October</option>
                                      <option value="November">November</option>
                                      <option value="December">December</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`lesson[${index}].month_name`}
                                      component="div"
                                      className="text-error"
                                    ></ErrorMessage>
                                  </td>
                                 
                                  <td>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name={`lesson[${index}].chapter_no`}
                                      id={`lesson[${index}].chapter_no`}
                                   
                                    ></Field>
 
                                    <ErrorMessage
                                      name={`lesson[${index}].chapter_no`}
                                      component="div"
                                      className="text-error"
                                    ></ErrorMessage>
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name={`lesson[${index}].chapter_name`}
                                      id={`lesson[${index}].chapter_name`}
                                      onKeyPress={(e) => {
                                        allowAlphabetAndSpacesOnly(e);
                                      }}
                                    ></Field>
 
                                    <ErrorMessage
                                      name={`lesson[${index}].chapter_name`}
                                      component="div"
                                      className="text-error"
                                    ></ErrorMessage>
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name={`lesson[${index}].no_of_periods`}
                                      id={`lesson[${index}].no_of_periods`}
                                    ></Field>
 
                                    <ErrorMessage
                                      name={`lesson[${index}].no_of_periods`}
                                      component="div"
                                      className="text-error"
                                    ></ErrorMessage>
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name={`lesson[${index}].topic_name`}
                                      id={`lesson[${index}].topic_name`}
                                      onKeyPress={(e) => {
                                        allowAlphabetAndSpacesOnly(e);
                                      }}
                                    ></Field>
 
                                    <ErrorMessage
                                      name={`lesson[${index}].topic_name`}
                                      component="div"
                                      className="text-error"
                                    ></ErrorMessage>
                                  </td>
 
                                  {getcells && getcells.length > 0 && getcells[index] && (
                                        getcells[index].map((cell, i) => (
                                          <React.Fragment key={i}>{cell}</React.Fragment>
                                        ))
                                      )}

                                <td style={{ width: 10 }}>
                                    {index !== 0 ? (
                                      <Button
                                        className="btn-danger rounded"
                                        type="button"
                                        onClick={() => {
                                          Swal.fire({
                                            text: "Do you want to delete?",
                                            icon: "question",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                            
                                              formikDetails.remove(index);
                                            }
                                          });
                                        }}
                                      >
                                        <BiTrash></BiTrash>
                                      </Button>
                                    ) : (
                                      ""
                                    )}
                                  </td>
    
                                </tr>
                              </>
                            );
                          }
                        );
                      }}
                    </FieldArray>
 
                    <tr>
                      <td colSpan={12} align="right">
                        <FieldArray name="lesson">
                          {(formikDetails) => {
                            return formikDetails.form.values.lesson.map(
                              (LJP, index) => {
                                return (
                                  <React.Fragment>
                                    {index === 0 ? (
                                      <bie.Button
                                        type="button"
                                        className="button-titile btn btn-sm btn-success"
                                        onClick={() => {
                                           formikDetails.push({
                                            year_name: '',
                                         //   course_code: '',
                                          //  course_name: '',
                                            year_code: '',
                                            sub_name: '',
                                            sub_code: '',
                                            month_code: '',
                                            month_name: '',
                                            chapter_no: '',
                                            chapter_name: '',
                                            no_of_periods: '',
                                            topic_name: '',
                                          });
                                        }}
                                      >
                                        <VscDiffAdded></VscDiffAdded>{" "}
                                      </bie.Button>
                                    ) : (
                                      ""
                                    )}
                                  </React.Fragment>
                                );
                              }
                            );
                          }}
                        </FieldArray>
                      </td>
                   
                    </tr>
                  </>
                </tbody>
              </bie.Table>
              <bie.Row></bie.Row>
              <bie.Button
                          type="submit"
                          className="btn btn-success  float-end btn-sm"
                        >
                          Submit
                        </bie.Button>
            </bie.Col>
          </bie.Row>
           
        </Form>
      </FormikProvider>
      <FormikProvider value={formik2}>
        <Form onSubmit={formik2.handleSubmit}>
        <Row className="px-2 pt-3">
        <bie.Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
        <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
        </bie.Col>
     
            <div className="mt-2">
             
              <BootstrapTable
                 keyField={(row, index) => index}
                data={filteredData1}
                paginationPerPage="10"
                columns={columns}
                striped
                hover
                bootstrap4
                pagination={paginationFactory()}
                filter={filterFactory({ search: true })}
              />
            </div>
          </Row>

                </Form>
            </FormikProvider>
            </bie.Container>
        </div>
    )
}
 
export default NewLessonPlans