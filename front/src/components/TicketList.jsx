import React, { useState, useEffect } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AutoComplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import TicketTable from "./TicketTable.jsx";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },

  button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    margin: "10px auto",
    border: "1px solid black",
    backgroundColor: "white",
  },
});

const TicketList = () => {
  const [screenings, updateScreenings] = useState([]);
  const [tickets, updateTickets] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const requestScreenings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/screenings`);
        updateScreenings(res.data);
      } catch (err) {
        alert("Błąd pobierania seansów");
      }
    };
    requestScreenings();
  }, []);
  useEffect(() => {
    const requestTickets = async () => {
      try {
        if (selectedScreening.id !== undefined) {
          const res = await axios.get(
            `http://localhost:8080/tickets?screeningId=${selectedScreening.id}`
          );
          console.log(res.data);
          updateTickets(res.data);
        }
      } catch (err) {
        alert("Błąd pobierania biletów");
      }
    };
    requestTickets();
  }, [selectedScreening]);

  return (
    <div className={classes.root}>
      <AutoComplete
        id="screening-selection"
        onChange={(event, newValue) => {
          setSelectedScreening(newValue);
        }}
        options={screenings}
        getOptionLabel={(option) =>
          `${option.film.title} - ${option.screeningDate} - ${option.startTime}`
        }
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            className={classes.input}
            {...params}
            label="Wybierz seans"
            variant="outlined"
            required
          />
        )}
      />
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default TicketList;
