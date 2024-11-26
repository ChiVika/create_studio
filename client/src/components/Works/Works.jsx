import { useState } from "react";


function Works() {
    const [userWork, setUserWork] = useState()

    const handelAdd = (e) => {
        const formData = new FormData();
        formData.append('lastname', );
    }


    return (
        <>
            <div className="Works">
                <button>Добавить новую работу</button>
            </div>
        </>
    )
}

export default Works
