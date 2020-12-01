import React from "react";
import { Jumbotron } from "react-bootstrap";
import CourseTable from "main/components/Courses/CourseTable"
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";
import {buildCreateFilter} from  "main/services/Courses/QuarterFilterService";
import { useHistory } from "react-router-dom";

const Home = () => {
    const { data: courses } = useSWR(
        "/api/public/courses",
        fetchWithoutToken
    );
    const update = buildCreateFilter(fetchWithoutToken, ()=>{}, ()=>{});
    const sample = {"quarterFilterValue": "0"}
    update(sample);
    const { data: active } = useSWR(
        "/api/public/filter",
        fetchWithoutToken
    );
    console.log(active);
    return (
        <Jumbotron>
            <div className="text-left">
               
                <h5>Welcome to the UCSB CS LAs App!</h5>
                <CourseTable courses={courses || []} />
            </div>
        </Jumbotron>
    );
};

export default Home;
