import React, {useEffect, useState} from "react";
import {firestore} from '../../Services/firebase'
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import PageTitle from "../../components/PageTitle";

export default function Tables4() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      await firestore.collection("/BV-Footer-ContactUs").onSnapshot(async (snapshot) => {
        if (isMounted) {
          setTableData([])
        }
        snapshot.forEach((snap) => {
          if (snap.exists) {
            if (isMounted) {
              let tempData = snap.data();
              let finalTemp = [tempData.firstName, tempData.email, tempData.message]
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
      <PageTitle title="BV Footer Form" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Responses"
            data={tableData}
            columns={["Name", "Email", "Message"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
