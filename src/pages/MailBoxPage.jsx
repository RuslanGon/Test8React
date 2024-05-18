import { useState } from "react";
// import "./App.css";
import MailBox from "../component/MailBox/MailBox";
// import MeestExpressUser from "../component/MailBox/meestExpress.json";
import { nanoid } from "nanoid";
import MailBoxForm from "../component/MailBoxForm/MailBoxForm";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser} from "../redux/mailbox/mailboxReducer";
import { selectFilteredUsers} from "../redux/mailbox/selector";
import MailBoxFilter from "../component/MailBoxFilter/MailBoxFilter";

function MailBoxPage() {
  // const [filter, setFilter] = useState("");

  // const [users, setUsers] = useState(() => {
  //   const stringyfieUsers = localStorage.getItem("users");
  //   if (!stringyfieUsers) return MeestExpressUser;
  //   const parseUsers = JSON.parse(stringyfieUsers);
  //   return parseUsers;
  // });

  // const users = useSelector(selectUsers);
  // const filter = useSelector(selectFilter);
  const dispatch = useDispatch()

  const [counter, setCounter] = useState(0);

  const filteredUsers = useSelector(selectFilteredUsers)

  // useEffect(() => {
  //   localStorage.setItem("users", JSON.stringify(users));
  // }, [users]);

  const onAddUsers = (formData) => {
    const finalUser = {
      ...formData,
      id: nanoid(),
    };
    // setUsers([...users, finalUser ])
    // setUsers((pevState) => [...pevState, finalUser]);
    // const action = {type: 'mailbox/ADD_USER', payload: finalUser }
    // const action = addUser(finalUser)
    // dispatch(action)
    dispatch(addUser(finalUser))
  };

  const onDeleteUsers = (userId) => {
    // const action = { type: "mailbox/DELETE_USER", payload: userId };
    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    // const action = deleteUser(userId);
    // dispatch(action);
    dispatch(deleteUser(userId))
  };

  // const onChangeFilter = (event) => {
  //   const action = { type: "mailbox/SET_FILTER", payload: event.target.value };
  //   setFilter(event.target.value);
  //   const action = setFilter(event.target.value);
  //   dispatch(action);
  //   dispatch(setFilter(event.target.value))
  // };

  // const filterUsers = useMemo(
  //   () =>
  //     users.filter((user) => {
  //       return (
  //         user.userName.toLowerCase().includes(filter.toLowerCase()) ||
  //         user.userEmail.toLowerCase().includes(filter.toLowerCase())
  //       );
  //     }),
  //   [filter, users]
  // );

  return (
    <div>
      <MailBoxForm onAddUsers={onAddUsers} />
      <section>
        <h2>Counter: {counter}</h2>
        <button onClick={() => setCounter(counter + 1)}>
          Click to increment counter
        </button>
      </section>
      <section>
        <MailBoxFilter />
      </section>
      <MailBox
        boxTitle="Meest Express"
        boxUsers={filteredUsers}
        onDeleteUsers={onDeleteUsers}
      />
    </div>
  );
}

export default MailBoxPage;
