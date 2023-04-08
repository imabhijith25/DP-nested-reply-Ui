import styles from "./button.module.css";
const DeleteButton = ({ onClicked }) => {
    return (
        <>
            <div className={styles.Delete} onClick={onClicked}>
                <img src="./images/icon-delete.svg" />
                Delete
            </div>
        </>
    );
};

export default DeleteButton;
