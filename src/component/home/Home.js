import { useEffect } from "react";
import "./Home.css"
const Home = ({user, history}) => {
   
    useEffect(() => {
        if(user) {
            history.push('/todo')
        }
    }, [user])

    return (
        <div className="img">
            <div className="welcome">Welcome</div>
            {/* <div className="circle">
                <div className="circle11"></div>
                <div className="circle1">
                    <div className="circle2"></div>
                </div>
            </div> */}
        </div>
    );
};
export default Home;