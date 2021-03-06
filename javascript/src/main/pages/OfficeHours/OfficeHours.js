import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import OfficeHourTable from "main/components/OfficeHours/OfficeHourTable"
import { buildDeleteOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import uploadOfficeHoursCSV from "main/services/OfficeHours/UploadCSV";
import OfficeHourCSVButton from "main/components/OfficeHours/OfficeHourCSVButton.js";
import {useHistory} from "react-router-dom";
import { CSVLink } from "react-csv";


const OfficeHours = () => {


  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: officeHourList, error, mutate: mutateOfficeHours } = useSWR(
    ["/api/public/officeHours", getToken],
    fetchWithToken
  );
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!officeHourList) {
    return <Loading />;
  }
  const deleteOfficeHour = buildDeleteOfficeHour(getToken, mutateOfficeHours);
  const headers = [{
    key: 'id',
    label: 'id'
  }, {
    key: 'startTime',
    label: 'Start Time'
  }, {
    key: 'endTime',
    label: 'End Time'
  }, {
    key: 'dayOfWeek',
    label: 'Day'
  }, {
    key: 'zoomRoomLink',
    label: 'Zoom Room'
  }, {
    key: 'notes',
    label: 'Notes'
  }, {
    key: 'tutorAssignment.id',
    label: 'Tutor Assignment'
  }];
  
  
  const uploadedOfficeHours = uploadOfficeHoursCSV(
    getToken, mutateOfficeHours
  );

  return (
    <>
      <Button style={{marginBottom: "1em"}} onClick={()=>history.push("/officehours/new")} >New Office Hour</Button>
      <OfficeHourCSVButton admin = {true} addTask = {uploadedOfficeHours} />
      <pre style={{ whiteSpace: 'pre', textAlign: 'left', width: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '0em' }} muted>
      format: Course, quarter, Instructor's first name, Instructor's last name, instructor's email, Tutor's First name, <br/>Tutor's last name, Tutor's email, Tutor's position, Day of the week, Start time, End time, zoom link, note
      </pre>
      <OfficeHourTable officeHours={officeHourList} admin={true} deleteOfficeHour={deleteOfficeHour}  />
      <Button><CSVLink style={{color: "white"}} headers={headers} data={officeHourList} filename = {"OfficeHours.csv"}>Download CSV</CSVLink></Button>
    </>
  );
};

export default OfficeHours;
