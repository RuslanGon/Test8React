import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/mailbox/selector";
import { setFilter } from "../../redux/mailbox/mailboxReducer";


const MailBoxFilter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter);
  const onChangeFilter = (event) => {
    
    dispatch(setFilter(event.target.value))
  };
  return (
      <div>
        <h2>Search users by name or email</h2>
        <input
          type="text"
          placeholder="search..."
          value={filter}
          onChange={onChangeFilter}
        />
      </div>
   
  )
}

export default MailBoxFilter

