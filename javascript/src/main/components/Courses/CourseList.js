import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from "react-router-dom";

export default ({courses}) => {
    const history = useHistory();


    const cellFormatter = (id, name) => {
        return (
            <div><a href="/course/{id}">{name}</a></div>
        );
    }

   
    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'name',
        text: 'Course Number',
        formatter: (cell, row) => cellFormatter(row.id, row.name)
    }, {
        dataField: 'quarter',
        text: 'Quarter'
    }];

    return (
        <BootstrapTable keyField='id' data={courses} columns={columns} />
    );
}