import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { incrementTimer } from "../redux/timer/timerSlice";
import { selectTimer } from "../redux/timer/selector";

const NotFoundPage = () => {

// const [timer, setTimer] = useState(0)

const dispatch = useDispatch()
const timer = useSelector(selectTimer)

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(incrementTimer);

      // setTimer((prevTimer) => prevTimer + 1);
      // setTimer(timer + 1)
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if(timer === 5){
    return <Navigate to='/' replace />
  }

  return (
    <div>
      <h2>Not found page 📛</h2>
      <h3>You will be redirected to home in {5 - timer} seconds</h3>
      <Link to='/' >
        <h1>Go home page 🔱</h1>
      </Link>
    </div>
  );
};

export default NotFoundPage;