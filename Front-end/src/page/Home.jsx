import { useNavigate } from "react-router-dom";
import {Nav} from "../components";
import {useAppContext} from "../context/useContext";

const Home = () => {
    const navigate = useNavigate();
    const {dark} = useAppContext();

    return (
        {

        }
    )
}
export default Home;