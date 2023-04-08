import styles from "./button.module.css";
const Submit = ({ onClicked }) => {
    return (
        <div className={styles.submit} onClick={onClicked}>
            Submit
        </div>
    );
};

export default Submit;
