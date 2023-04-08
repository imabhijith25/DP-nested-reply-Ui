import styles from "./upvote.module.css";
const Upvote = ({ counter, item, data, setData }) => {
    const action = (val) => {
        function updateCommentReplyCount(comments, idToSearch, counter) {
            for (const comment of comments) {
                if (comment.id === idToSearch) {
                    comment.score = counter;
                    return true;
                }
                if (comment?.replies?.length > 0) {
                    const replyUpdated = updateCommentReplyCount(
                        comment.replies,
                        idToSearch,
                        counter
                    );
                    if (replyUpdated) {
                        // comment.replies =
                        //     comment.replies.reduce(
                        //         (total, reply) => total + reply.score,
                        //         0
                        //     ) + comment?.replies?.length;
                        return true;
                    }
                }
            }
            return false;
        }

        const idToSearch = item.id;

        if (val === 0) {
            const updated = updateCommentReplyCount(
                [...data.comments],
                idToSearch,
                counter + 1
            );
            if (updated) {
                console.log(data.comments);
                setData({ ...data, comments: [...data.comments] });
            } else {
                console.log(`Failed to update comment with id ${idToSearch}`);
            }
        } else {
            const updated = updateCommentReplyCount(
                [...data.comments],
                idToSearch,
                counter - 1
            );
            if (updated) {
                console.log(data.comments);
                setData({ ...data, comments: [...data.comments] });
            } else {
                console.log(`Failed to update comment with id ${idToSearch}`);
            }
        }

        // } else {
        //     console.log(`No comment found with id ${idToSearch}`);
        // }
    };
    return (
        <>
            <div className={styles.upvote}>
                <div
                    className={styles.plus}
                    onClick={() => {
                        action(0);
                    }}
                >
                    <p>+</p>
                </div>
                <div className={styles.counter}>{counter}</div>
                <div
                    className={styles.minus}
                    onClick={() => {
                        action(1);
                    }}
                >
                    <p>-</p>
                </div>
            </div>
        </>
    );
};

export default Upvote;
