import styles from './ProcurementManager.module.css'

const ProcurementManager = ({
    procurementLocations,
    onClickUser,
    selectedProcurementLocation,
    procurementData,
    onClickProcurementPlace
}) => {


  return (
    <div className={styles.container}>
      <div className={styles.header_div}>
        <p className={styles.page_header}>Procurement manager</p>
        <button className={styles.btn} onClick={()=>onClickUser('login')}>back</button>
      </div>
      <div className={styles.places}>
        <p>Places</p>
        {procurementLocations.map(pla => (
          <button key={pla} className={styles.placeButton} onClick={()=>onClickProcurementPlace(pla)}>
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
  );
};

export default ProcurementManager;
