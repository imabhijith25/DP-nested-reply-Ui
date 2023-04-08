import { useEffect } from "react";
import { useState } from "react";
import Add from "../Components/AddComment/Add";
import Card from "../Components/Card/Card";
import Delete from "../Components/Modals/Delete";
import { exp } from "../mocks/data";

const Page = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("expData")) {
            setData(JSON.parse(localStorage.getItem("expData")));
        } else {
            setData(exp);
        }
    }, []);
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            console.log(data);
            localStorage.setItem("expData", JSON.stringify(data));
        }
    }, [data]);
    return (
        <>
            {/* <Delete /> */}
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
                {data.comments?.map((item, index) => (
                    <Card
                        item={item}
                        reply={false}
                        setData={setData}
                        data={data}
                    />
                ))}
                <Add profile={data} setData={setData} />
            </div>
        </>
    );
};

export default Page;
