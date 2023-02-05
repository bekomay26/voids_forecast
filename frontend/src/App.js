import { useEffect, useState } from "react";
import styles from './App.module.css';
import {getDirectorData, getProcurementData} from "./pages/Login/dataApi";

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

  const onClickCloseStore = () => {

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
      <div className={styles.container}>
      <div className={styles.header_div}>
        <p className={styles.page_header}>Procurement manager</p>
        <button className={styles.btn} onClick={()=>onClickUser('login')}>back</button>
      </div>
        <div className={styles.places}>
          <p>Places</p>
          {procurementLocations.map(pla => (
            <button className={styles.placeButton} onClick={()=>onClickProcurementPlace(pla)}>
              {pla}
            </button>
          ))}
        </div>
        <div className={styles.closeDays}>
          <p>{`Forecast in ${selectedProcurementLocation}`}</p>
          {procurementData.map((item, index) => (
            <div className={styles.closeRow} key={index}>
              <div className={styles.closeCell}>
                <span>Date</span>
                <p>{item['date']}</p>
              </div>
              <div className={styles.closeCell}>
                <span>Temperature</span>
                <p>{`${item['temp'] || '--'}`}</p>
              </div>
              <div className={styles.closeCell}>
                <span>Sales</span>
                <p>{`${item['sales'].toFixed(2) || '--'}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  else if(selectedPage === 'director') {
    return (
      <div className={styles.container}>
      <div className={styles.header_div}>
        <p className={styles.page_header}>Managing director</p>
        <button className={styles.btn} onClick={()=>onClickUser('login')}>back</button>
      </div>

        <div className={styles.places}>
          <p>Places</p>
          {directorLocations.map(pla => (
            <button className={styles.placeButton} onClick={()=>onClickDirectorPlace(pla)}>
              {pla}
            </button>
          ))}
        </div>

        <div className={styles.closeDays}>
          <p>{`Days to close in ${selectedLocation}`}</p>
          {directorData.map((item, index) => (
            <div className={styles.closeRow} key={index}>
              <div className={styles.closeCell}>
                <span>Close Days</span>
                <p>{`${item['date_range'][0]} - ${item['date_range'][2] || ''}`}</p>
              </div>
              <div className={styles.closeCell}>
                <span>Temperature</span>
                <p>{`${item['temp_range'] || '--'}`}</p>
              </div>
              <div className={styles.closeCell}>
                <span>Sales total for 3 days</span>
                <p>{`${item['running_total'].toFixed(2) || '--'}`}</p>
              </div>
              <button className={styles.placeButton} onClick={()=>onClickCloseStore()}>Close</button>
            </div>
          ))}
        </div>
      </div>
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
