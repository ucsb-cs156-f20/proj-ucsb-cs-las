import React from "react";
import { render } from "@testing-library/react";
import CourseTable from "main/components/Courses/CourseTable"


describe("CourseForm tests", () => {
  const courses = [
    {
      name: "CMPSC 156",
      id: 1,
      quarter: "F20",
      instructorFirstName: "Phill",
      instructorLastName: "Conrad",
      instructorEmail: "phtcon@ucsb.edu",
    },
    {
      name: "CMPSC 148",
      id: 2,
      quarter: "F20",
      instructorFirstName: "Chandra",
      instructorLastName: "Krintz",
      instructorEmail: "krintz@example.org",
    },
  ];

  const deleteCourse = jest.fn();
  test("renders without crashing", () => {
    render(<CourseTable courses={courses} admin={true} deleteCourse={deleteCourse} />);
  });

  test("renders without crashing not admin", () => {
    render(<CourseTable courses={courses} admin={false} deleteCourse={deleteCourse} />);
  });

});
