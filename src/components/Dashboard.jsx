import { Button, CircularProgress, Grid } from "@mui/material";
import JobCard from "./JobCard/JobCard";
import SearchFilter from "./SearchFilter";
import useJobDetails from "../hooks/useJobDetails";
import updateSearchFilter from "../reducers/searchReducer";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const filters = useSelector((state) => state.filters);
  const {
    data: jobDetailsData,
    status,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  } = useJobDetails();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const jobsData = jobDetailsData.pages.map((jobDetails) =>
    jobDetails.jdList.map((job) => {
      return {
        ...job,
      };
    })
  );

  const filteredParameters = Object.values(filters);

  const filteredResponse = jobsData[0].filter((job) => {
    if (filteredParameters[0].role.length) {
      return filteredParameters[0].role.includes(job.jobRole);
    }
    if (filteredParameters[0].companyName)
      return (
        job.companyName.toLowerCase() ===
        filteredParameters[0].companyName.toLowerCase()
      );
    if (filteredParameters[0].numberOfEmployees) {
      return filteredParameters[0].numberOfEmployees
        .map((employees) => Number(employees.split("-")[0]))
        .includes(job.employees);
    }
    if (filteredParameters[0].jobType) {
      return filteredParameters[0].jobType.includes(job.location);
    }
    if (filteredParameters[0].experience)
      return filteredParameters[0].experience.includes(job.minExp);
    if (filteredParameters[0].salary) {
      return filteredParameters[0].salary
        .map((salary) => Number(salary.charAt(0)))
        .includes(job.minJdSalary);
    } else return true;
  });

  const jobDetailsResponse = jobDetailsData.pages.map((jobDetails) =>
    jobDetails.jdList.map((job, key) => {
      return (
        <Grid item key={key}>
          <JobCard {...job} />
        </Grid>
      );
    })
  );

  const handleFilterChange = (name, value) => {
    dispatch(updateSearchFilter({ name, value }));
  };

  if (status === "pending") {
    return <CircularProgress />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Grid container columns={5}>
        <SearchFilter handleFilterChange={handleFilterChange} />
      </Grid>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {filteredResponse.length 
          ? filteredResponse.map((job, key) => {
              return (
                <Grid item key={key}>
                  <JobCard {...job} />
                </Grid>
              );
            })
          : jobDetailsResponse}
      </Grid>
      <Button onClick={() => fetchNextPage()} ref={ref}>
        {isFetchingNextPage ? <CircularProgress /> : ""}
      </Button>
    </div>
  );
};

export default Dashboard;
