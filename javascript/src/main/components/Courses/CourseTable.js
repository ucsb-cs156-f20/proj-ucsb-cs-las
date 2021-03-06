import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";


export default ({ courses, admin, deleteCourse }) => {
    const history = useHistory();
    const { data: filter } = useSWR(
        "/api/public/filter",
        fetchWithoutToken
    );

    if (filter && courses && filter.length > 0 &&filter[0].activeQuarter !== "All") {
        if (filter.length > 0 &&filter[0].activeQuarter !== "All") {


            courses = !admin ? courses.filter((course) => course.quarter === filter[0].activeQuarter) : courses;
        }
    }
    const renderEditButton = (id) => {
        return (
            <Button data-testid="edit-button" onClick={() => { history.push(`/courses/edit/${id}`) }}>Edit</Button>
        )
    }

    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" onClick={() => deleteCourse(id)}>Delete</Button>
        )
    }

    function stripesFormatter(cell) {

        return (

            <span>
                <a href={`mailto:${cell}`}> {cell} </a>
            </span>

        );

    }


    function courseLinkFormatter(id, name){
        var link = `/courses/show/${id}`
        return (  
            <div><a href={link}>{name}</a></div> 
        )
    }

    const columns = [{
        dataField: 'id',
        text: 'id',
        sort: true,
    }, {
        dataField: 'name',
        text: 'Course Number',
        sort: true,
        formatter: (_cell, row) => courseLinkFormatter(row.id, row.name)
    }, {
        dataField: 'quarter',
        text: 'Quarter',
        sort: true,
    }, {
        dataField: 'instructorFirstName',
        text: 'First',
        sort: true,
        formatter: stripesFormatter

    }, {
        dataField: 'instructorLastName',
        text: 'Last',
        sort: true,
        formatter: stripesFormatter
    }, {
        dataField: 'instructorEmail',
        text: 'Email',
        sort: true,
        formatter: stripesFormatter
    }];

    if (admin) {
        columns.push({
            text: "Edit",
            isDummyField: true,
            dataField: "edit",
            formatter: (_cell, row) => renderEditButton(row.id)
        });
        columns.push({
            text: "Delete",
            isDummyField: true,
            dataField: "delete",
            formatter: (_cell, row) => renderDeleteButton(row.id)
        });
    }

    return (
        <BootstrapTable keyField='id' bootstrap4={true} data={courses} columns={columns} striped />
    );
}
