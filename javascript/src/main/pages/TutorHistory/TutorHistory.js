import React, { useState } from "react";
import { buildSearchTutorHistoryByCourse } from "main/services/TutorHistory/TutorHistoryService";
import TutorHistoryForm from "main/components/TutorHistory/TutorHistoryForm";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable";
import { useAuth0 } from "@auth0/auth0-react"; 
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const TutorHistory = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const emptySearchResults = {
    showResults: false, 
    results: [],
  }
  const [searchResults, setSearchResults] = useState(emptySearchResults);
  const searchTutorHistoryByCourse = buildSearchTutorHistoryByCourse(
    getToken,
    (data) => {
      // onSuccess
      // update the table component
      setSearchResults({ 
        ...searchResults,
        showResults: true,
        results: data
      });
      addToast("Search results updated", { appearance: "success" });
    },
    (err) => {
      // onError
      setSearchResults({
        ...searchResults,
        showResults: false
      });
      addToast(`Error finding tutors for course: ${err}`, { appearance: "error" });
    }
  );



  return (
    <>
      <h1>Search for Tutors by Course</h1>
      <TutorHistoryForm searchTutorHistoryByCourse={searchTutorHistoryByCourse} />
      { searchResults.showResults && <TutorAssignmentTable tutorAssignments={searchResults.results} isInstructor={true} /> }
    </>
  );
};

export default TutorHistory;