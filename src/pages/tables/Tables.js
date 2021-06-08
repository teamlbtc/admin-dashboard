import React, { useEffect, useState } from "react";
import {firestore} from '../../Services/firebase'
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

export default function Tables() {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let isMounted = true;
    const fetchData = async() => {
      await firestore.collection("/ContactUs").onSnapshot(async(snapshot) => {
        if(isMounted){
          setTableData([])
        }
        snapshot.forEach((snap) => {
          if(snap.exists){
            if(isMounted){
              let tempData = snap.data();
              let finalTemp = [tempData.FirstName, tempData.LastName, tempData.Email, tempData.Subject, tempData.Message]
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
  },[])

  return (
    <>
      <PageTitle title="Contact Us Form" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Contact Us"
            data = {tableData}
            columns={["First Name", "Last name", "Email", "Subject", "Message"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
