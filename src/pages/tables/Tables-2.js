import React, {useEffect, useState} from "react";
import {firestore} from '../../Services/firebase'
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";

export default function Tables2() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      await firestore.collection("/SignUpForm").onSnapshot(async (snapshot) => {
        if (isMounted) {
          setTableData([])
        }
        snapshot.forEach((snap) => {
          if (snap.exists) {
            if (isMounted) {
              let tempData = snap.data();
              let finalTemp = [tempData.TypeValue, tempData.Name, tempData.PhoneNumber, tempData.Email, tempData.Subject, tempData.Message]
              setTableData(prevState => [...prevState, finalTemp])
            }
          }
        })
      })
    }
    fetchData();

    return () => {
      isMounted = false;
    }
  }, [])
  return (
    <>
      <PageTitle title="Sign Up Form" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Users Signed Up"
            data={tableData}
            columns={["Type of User", "Name", "Phone Number", "Email", "Subject", "Message"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
