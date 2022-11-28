import { useEffect, useState } from "react"

const useCurrectUser = email => {
    const [currentUser, setcurrentUser] = useState('buyer');
    const [iscurrentUserLoading, setcurrentUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/currectUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setcurrentUser(data.status);
                    setcurrentUser(data.name);
                    setcurrentUserLoading(false);
                })
        }
    }, [email])
    return [currentUser, iscurrentUserLoading]
}

export default useCurrectUser;