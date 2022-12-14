import { useEffect, useState } from "react"

const useCurrectUser = email => {
    const [currentUser, setcurrentUser] = useState('');
    const [iscurrentUserLoading, setcurrentUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://final-12-server-sayyed-ahsan.vercel.app/currectUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setcurrentUser(data.status);
                    setcurrentUserLoading(false);
                })
        }
    }, [email])
    return [currentUser, iscurrentUserLoading]
}

export default useCurrectUser;