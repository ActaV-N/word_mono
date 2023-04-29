import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import withAuth from "../lib/utils/withAuth";
import { UserStateContext } from "./_app";

const Landing = () => {
    const router = useRouter();
    const {email} = useContext(UserStateContext);

    useEffect(() => {
        if(email){
            router.replace('/zoop');
        }
    }, [email])

    return <>Not Logged In</>
}


export default withAuth(Landing)