import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import styles from './App.module.css';
import {getDirectorData, getProcurementData} from "./pages/Login/dataApi";
import Director from "./components/Director";
import ProcurementManager from "./components/ProcurementManager";

function App() {
  const [selectedPage, setSelectedPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const [allLocationsDirectorData, setAllLocationsDirectorData] = useState({});
  const [directorLocations, setDirectorLocations] = useState([]);
  const [directorData, setDirectorData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [procurementLocations, setProcurementLocations] = useState([]);
  const [procurementData, setProcurementData] = useState([]);
  const [selectedProcurementLocation, setSelectedProcurementLocation] = useState("");
  const [allLocationsProcurementData, setAllLocationsProcurementData] = useState({});
  const [closedDays, setClosedDays] = useState([]);


  const fetchDirectorData = async () => {
    setLoading(true);
    try {
      const {data} = await getDirectorData();
      const places = Object.keys(data)
      setDirectorLocations(places)
      setAllLocationsDirectorData(data)

      setSelectedLocation(places[0])
      setDirectorData(data[places[0]])
    } catch (e) {

    }
    setLoading(false);
  };

  const fetchProcurementData = async () => {
    setLoading(true);
    try {
      const { data } = await getProcurementData({});
      const places = Object.keys(data)
      setProcurementLocations(places)
      setAllLocationsProcurementData(data)

      setSelectedProcurementLocation(places[0])
      setProcurementData(data[places[0]])
    } catch (e) {

    }
    setLoading(false);
  };

  useEffect(() => {
    if(selectedPage === 'director') {
      fetchDirectorData()
    } else if(selectedPage === 'proc') {
      fetchProcurementData()
    }
  }, [selectedPage])

  const onClickUser = (user) => {
    if(user === 'proc') {
      setSelectedPage('proc')
    } else if(user === 'director') {
      setSelectedPage('director')
    } else {
      setSelectedPage('login')
    }
  }

  const onClickDirectorPlace = (pla) => {
    setDirectorData(allLocationsDirectorData[pla])
    setSelectedLocation(pla)
  }

  const onClickProcurementPlace = (pla) => {
    setProcurementData(allLocationsProcurementData[pla])
    setSelectedProcurementLocation(pla)
  }

  const onClickCloseStore = (item) => {
    const newClosedDays = closedDays.concat(item['date_range'])

    // Note: closed days should ideally be stored in a database
    const newDirectorData = directorData.map(dir => {
      const newDir = {...dir}

      const firstClosedDay = dayjs(item['date_range'][0], 'YYYY-MM-DD')
      const dayBeforeCloseStart = firstClosedDay.add(-1, 'day').format('YYYY-MM-DD')
      const lastClosedDay = dayjs(item['date_range'][2], 'YYYY-MM-DD')
      const dayAfterCloseEnd = lastClosedDay.add(1, 'day').format('YYYY-MM-DD')
      // closed days plus day before and day after
      const closedBoundDates = [dayBeforeCloseStart, ...item['date_range'], dayAfterCloseEnd]

      if(dir['date_range'][0] === item['date_range'][0] && dir['running_total'] === item['running_total']) {
        // if this is the closed date range,
        newDir['closed'] = true
        return newDir
      }
      else if (dir['date_range']?.some(ele => closedBoundDates.includes(ele) )) {
        // If one of the dates is already closed, or comes a day before or after
        newDir['cant_close'] = true
        return newDir
      }
      return dir
    })
    setDirectorData(newDirectorData)
    setClosedDays(newClosedDays)
  }

  if(loading) {
    return (
      <div className={styles.loginContainer}>
        <p>Loading</p>
      </div>
    )
  }

  else if(selectedPage === 'proc') {
    return (
      <ProcurementManager
        onClickUser={onClickUser}
        procurementData={procurementData}
        procurementLocations={procurementLocations}
        selectedProcurementLocation={selectedProcurementLocation}
        onClickProcurementPlace={onClickProcurementPlace}
      />
    )
  }
  else if(selectedPage === 'director') {
    return (
      <Director
        directorData={directorData}
        directorLocations={directorLocations}
        onClickCloseStore={onClickCloseStore}
        onClickDirectorPlace={onClickDirectorPlace}
        onClickUser={onClickUser}
        selectedLocation={selectedLocation}
        />
    )
  }
  return (
    <div className={styles.loginContainer}>
      <p className={styles.header}>Login</p>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={()=>onClickUser('proc')}>Procurement manager</button>
        <button className={styles.btn} onClick={()=>onClickUser('director')}>Managing director</button>
      </div>
    </div>
  );
}

export default App;
