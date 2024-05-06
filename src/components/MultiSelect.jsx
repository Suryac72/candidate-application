import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, itemName, theme) {
  return {
    fontWeight:
      itemName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const  MultiSelect = ({ placeHolder, listItems = [],onChange}) => {
  const theme = useTheme();
  const [itemName, setitemName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setitemName(typeof value === "string" ? value.split(",") : value);
    onChange(event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200,marginTop:10,marginBottom:10 }}>
        <InputLabel size="small" id="demo-multiple-chip-label">{placeHolder}</InputLabel>
        <Select
          size="small"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {listItems.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, itemName, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

MultiSelect.propTypes = {
    placeHolder: PropTypes.string.isRequired,
    listItems: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}
export default MultiSelect;