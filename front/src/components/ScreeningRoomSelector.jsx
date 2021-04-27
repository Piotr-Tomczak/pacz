import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    marginBottom: "1%",
    marginTop: "1.25%",
  },
}));

const ScreeningRoomSelector = ({ setSelectedScreeningRoom }) => {
  const classes = useStyles();
  const [screeningRooms, setScreeningRooms] = useState([]);
  const requestData = async () => {
    let json = await axios.get(`http://localhost:8080/screeningRooms`);
    setScreeningRooms(json.data);
  };

  useEffect(() => requestData(), []);

  return (
    <Autocomplete
      id="room-selection"
      onChange={(event, newValue) => {
        console.log(newValue);
        setSelectedScreeningRoom(newValue);
      }}
      options={screeningRooms}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          className={classes.input}
          {...params}
          label="Wybierz salę"
          variant="outlined"
          required
        />
      )}
    />
  );
};

export default ScreeningRoomSelector;
