import { Grid,TextField } from "@mui/material";
import MultiSelect from "./MultiSelect";
import { experience, jobType, numberOfEmployees, roles, salary } from "../utils/dropdownData";
import { useDispatch } from "react-redux";
import { updateSearchFilter } from "../actions/searchActions";

const SearchFilter = () => {

  const dispatch = useDispatch();
  const handleFilterChange = (name, value) => {
    dispatch(updateSearchFilter({ name, value }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleFilterChange(name, value);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={0} columns={{ xs: 5 }}>
      <Grid item>
        <MultiSelect
          placeHolder="Role"
          listItems={roles}
          onChange={(value) => handleFilterChange("role", value)}
        />
      </Grid>
      <Grid item>
        <MultiSelect
          placeHolder="No. of Employees"
          listItems={numberOfEmployees}
          onChange={(value) => handleFilterChange("numberOfEmployees", value)}
        />
      </Grid>
      <Grid item>
        <MultiSelect
          placeHolder="Experience"
          listItems={experience}
          onChange={(value) => handleFilterChange("experience", value)}
        />
      </Grid>
      <Grid item>
        <MultiSelect
          placeHolder="Job Type"
          listItems={jobType}
          onChange={(value) => handleFilterChange("jobType", value)}
        />
      </Grid>
      <Grid item>
        <MultiSelect
          placeHolder="Salary"
          listItems={salary}
          onChange={(value) => handleFilterChange("salary", value)}
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          size="small"
          name="companyName"
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
};

export default SearchFilter;