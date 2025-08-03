import styles from '../../../assets/styles/global.module.css';
import NoEvents from '../../../assets/images/noEvents.webp';



const NoEvent = () => {

    return (
            <div className={styles.imageContainer}>
                  <img src={NoEvents} alt="No Events" className={styles.noEventImage} />
            </div>
    )
}

export default NoEvent;
