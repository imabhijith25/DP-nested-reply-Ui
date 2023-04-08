import styles from "./button.module.css";
const Reply = ({ onClicked }) => {
    return (
        <>
            <div className={styles.reply} onClick={onClicked}>
                <img src="./images/icon-reply.svg" />
                reply
            </div>
        </>
    );
};

export default Reply;
