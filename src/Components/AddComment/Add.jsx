import { useState } from "react";
import Reply from "../Buttons/Reply";
import Submit from "../Buttons/Submit";
import styles from "./add.module.css";
import { v4 as uuidv4 } from "uuid";
const Add = ({ profile, setData, reply, replyId, handleReply }) => {
    const [value, setValue] = useState("");
    const handleSubmit = () => {
        if (!reply) {
            const temp = { ...profile };
            const tempArr = temp.comments;
            const newflattend = tempArr.flatMap((obj) => obj.replies);
            console.log(newflattend);
            tempArr.push({
                id: uuidv4(),
                content: value,
                createdAt: "now",
                score: 0,
                user: {
                    image: {
                        png: "./images/avatars/image-juliusomo.png",
                        webp: "./images/avatars/image-juliusomo.webp",
                    },
                    username: "juliusomo",
                },
                replies: [],
            });
            setData(temp);
            setValue("");
        } else {
            function updateCommentReplyCount(comments, idToSearch, newdata) {
                for (const comment of comments) {
                    if (comment.id === idToSearch) {
                        if (comment?.replies?.length > 0) {
                            comment.replies = [...comment.replies, newdata];
                        } else {
                            comment.replies = [newdata];
                        }
                        return true;
                    }
                    if (comment?.replies?.length > 0) {
                        const replyUpdated = updateCommentReplyCount(
                            comment.replies,
                            idToSearch,
                            newdata
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

            const updated = updateCommentReplyCount(
                [...profile.comments],
                replyId,
                {
                    id: uuidv4(),
                    content: value,
                    createdAt: "now",
                    score: 0,
                    user: {
                        image: {
                            png: "./images/avatars/image-juliusomo.png",
                            webp: "./images/avatars/image-juliusomo.webp",
                        },
                        username: "juliusomo",
                    },
                    replies: [],
                }
            );
            if (updated) {
                console.log(profile.comments);
                setData({ ...profile, comments: [...profile.comments] });
                handleReply(false);
            } else {
                // console.log(`Failed to update comment with id ${idToSearch}`);
            }
        }
    };
    return (
        <div className={styles.card}>
            <img src={profile.currentUser?.image?.png} alt="prof" />
            <textarea
                placeholder="Add your comment here..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            ></textarea>
            <Submit onClicked={handleSubmit} />
        </div>
    );
};

export default Add;
