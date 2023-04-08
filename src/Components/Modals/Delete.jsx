import styles from "./modal.module.css";
const Delete = ({ cancel, deleteMe }) => {
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h3>Delete comment</h3>
                    <p>
                        Are you sure you want to delete this comment? This will
                        remove the comment and can't be undone
                    </p>
                    <div className={styles.buttonArea}>
                        <button className={styles.cancel} onClick={cancel}>
                            No, Cancel
                        </button>
                        <button className={styles.delete} onClick={deleteMe}>
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Delete;
