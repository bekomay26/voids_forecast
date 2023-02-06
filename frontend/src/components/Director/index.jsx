import styles from './Director.module.css'

const closeBackgroundColor = (item) => {
  if(item['closed']) {
    return 'rgba(221, 17, 68, 0.7)'
  } else if(item['cant_close']) {
    return 'rgba(221, 17, 68, 0.2)'
  }
  return '#FFFFFF'
};

const CloseComponent = ({ item, onClickCloseStore}) => {
  if(item['closed']) {
    return(<p className={styles.closedDay}>Closed</p>)
  } else if(item['cant_close']) {
    return(<p className={styles.cantClose}>Cant close!! Overlaps with an already closed day</p>)
  }
  return (
    <button className={styles.placeButton} onClick={()=>onClickCloseStore(item)}>Close</button>
  );
};

const Director = ({
    directorLocations,
    directorData,
    selectedLocation,
    onClickCloseStore,
    onClickUser,
    onClickDirectorPlace
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.header_div}>
        <p className={styles.page_header}>Managing director</p>
        <button className={styles.btn} onClick={()=>onClickUser('login')}>back</button>
      </div>

      <div className={styles.places}>
        <p>Places</p>
        {directorLocations.map(pla => (
          <button key={pla} className={styles.placeButton} onClick={()=>onClickDirectorPlace(pla)}>
            {pla}
          </button>
        ))}
      </div>

      <div className={styles.closeDays}>
        <p>{`Days to close in ${selectedLocation}`}</p>
        {directorData.map((item, index) => (
          <div className={styles.closeRow} key={index} style={{backgroundColor: closeBackgroundColor(item)}}>
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
            <CloseComponent item={item} onClickCloseStore={onClickCloseStore}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Director;
