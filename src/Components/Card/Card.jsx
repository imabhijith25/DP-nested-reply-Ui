import { useState } from "react";
import Add from "../AddComment/Add";
import DeleteButton from "../Buttons/Delete";
import Reply from "../Buttons/Reply";
import Delete from "../Modals/Delete";
import Upvote from "../Upvote/Upvote";
import styles from "./Card.module.css";
const Card = ({ item, reply, data, setData }) => {
    const [replyClick, setReplyClick] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const cancel = () => {
        setDeleteModal(false);
    };
    const deleteMe = () => {
        handleDelete();
        setDeleteModal(false);
    };
    const showDeletePopup = () => {
        setDeleteModal(true);
    };
    const handleReply = () => {
        setReplyClick(!replyClick);
    };
    const handleDelete = () => {
        function updateDelete(comments, idToSearch) {
            for (let comment in comments) {
                if (comments[comment].id == idToSearch) {
                    comments.splice(comment, 1);
                    return true;
                }
                if (comments[comment]?.replies?.length > 0) {
                    const replyUpdated = updateDelete(
                        comments[comment].replies,
                        idToSearch
                    );
                    if (replyUpdated) {
                        return true;
                    }
                }
            }
            return false;
        }
        // let newdata = [...data.comments];
        console.log(item.id);
        const updated = updateDelete(data.comments, item.id);
        if (updated) {
            setData({ ...data, comments: data.comments });
        }
    };
    return (
        <>
            {deleteModal && <Delete cancel={cancel} deleteMe={deleteMe} />}
            <div
                className={styles.card}
                style={reply ? { width: "auto" } : { width: "100%" }}
            >
                <div className={styles.like}>
                    <Upvote
                        counter={item.score}
                        item={item}
                        data={data}
                        setData={setData}
                    ></Upvote>
                </div>
                <div className={styles.mainComment}>
                    <div className={styles.commentDetail}>
                        <div className={styles.name}>
                            <img src={item?.user?.image?.webp} alt="profile" />
                            <p className={styles.p}>{item?.user?.username}</p>
                            <p className={styles.date}>{item?.createdAt}</p>
                        </div>
                        <div className={styles.replyAndDelete}>
                            <Reply onClicked={handleReply} />
                            {item?.user?.username ==
                                data.currentUser.username && (
                                <DeleteButton onClicked={showDeletePopup} />
                            )}
                        </div>
                    </div>
                    <div className={styles.comment}>{item.content}</div>
                    <div className={styles.mobileView}>
                        <div className={styles.likeMob}>
                            <Upvote counter={item.score}></Upvote>
                        </div>
                        <div className={styles.replyAndDeleteMob}>
                            <Reply onClicked={handleReply} />
                            {item?.user?.username ==
                                data.currentUser.username && (
                                <DeleteButton onClicked={showDeletePopup} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {replyClick && (
                <Add
                    profile={data}
                    setData={setData}
                    reply={true}
                    replyId={item.id}
                    handleReply={handleReply}
                />
            )}
            {/* {reply && ( */}
            <>
                <div
                    style={{
                        marginLeft: "30px",
                    }}
                >
                    {item?.replies?.length > 0 && (
                        <div style={{ display: "flex" }}>
                            <div className={styles.bar}></div>
                            <div
                                style={{
                                    width: "100%",
                                }}
                            >
                                {item?.replies?.map((item, index) => (
                                    <Card
                                        item={item}
                                        // reply={true}
                                        data={data}
                                        setData={setData}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </>
            {/* )} */}
        </>
    );
};

export default Card;
