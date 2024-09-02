import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllData");
        setRows(response.data);
        console.log(rows);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Experiments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Experiment ID</TableCell>
            <TableCell>Cycles</TableCell>
            <TableCell>Length</TableCell>
            <TableCell align="right">Test Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.experimentDetails.fullName}</TableCell>
              <TableCell>{row.experimentDetails.testID}</TableCell>
              <TableCell>{row.tests[0]?.cycles}</TableCell>
              <TableCell>{row.experimentDetails.length}</TableCell>
              <TableCell align="right">
                {new Date(row.tests[0]?.testDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See All
      </Link>
    </React.Fragment>
  );
}
