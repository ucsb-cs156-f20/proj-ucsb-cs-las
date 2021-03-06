import { fetchWithToken } from "main/utils/fetch";

const buildCreateTutorAssignment = (getToken, onSuccess, onError) => {
  const func = async (tutorAssignment) => {
    try {
      await fetchWithToken(`/api/member/tutorAssignments`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutorAssignment),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildUpdateTutorAssignment  = (getToken, onSuccess, onError) => {
  const func = async (item, id) => {
    try {
      await fetchWithToken(`/api/member/tutorAssignments/${id}`, getToken, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildDeleteTutorAssignment  = (getToken, onSuccess, onError) => {
  const func = async (id) => {
    try {
      await fetchWithToken(`/api/member/tutorAssignments/${id}`, getToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        noJSON: true,
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const uploadTutorAssignmentCSV = (getToken, onSuccess, onError) => {
  const func = async (file) => {
    const data = new FormData();
    data.append("csv", file);
    try {
      await fetchWithToken("/api/member/tutorAssignments/upload", getToken, {
        method: "POST",
        body: data,
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

export { buildCreateTutorAssignment, buildUpdateTutorAssignment, buildDeleteTutorAssignment, uploadTutorAssignmentCSV };
