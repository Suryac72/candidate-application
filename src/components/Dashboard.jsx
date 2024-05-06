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

  /**
   * Filter data based on search values
   */
  const filteredResponse = jobsData[0].filter((job) => {
    return filteredParameters.every((filter) => {
      if (filter.jobType.length > 0) {
        return filter.jobType.includes(job.location);
      }
      if (filter.role.length) {
        return filter.role.includes(job.jobRole);
      }
      if (filter.companyName) {
        return (
          job.companyName.toLowerCase() === filter.companyName.toLowerCase()
        );
      }
      if (filter.numberOfEmployees.length) {
        return filter.numberOfEmployees
          .map((employees) => {
            const range = employees.split("-");
            return job.employees >= Number(range[0]) && job.employees <= Number(range[1]);
          })
          .includes(true);
      }
      if (filter.experience.length) {
        return filter.experience.includes(job.minExp);
      }
      if (filter.salary.length) {
        const filteredSalaries = filter.salary.map((salary) => Number(salary.replace('L','')));
        return filteredSalaries.some((salary) => salary >= job.minJdSalary && salary <= job.maxJdSalary);
      }
      return true; 
    });
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
