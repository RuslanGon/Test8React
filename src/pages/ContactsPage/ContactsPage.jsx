import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { apiGetContacts, apiRemoveContact } from "../../redux/contacts/contactsSlice"
import { selecPhoneBookContacts, selecPhoneBookIsError, selecPhoneBookIsLoading } from "../../redux/contacts/selector"
import Loader from "../../component/Loader/Loader"
import ErrorMessage from "../../component/ErrorMessage/ErrorMessage"
import NewContact from "../../component/NewContact/NewContact"


const ContactsPage = () => {
const dispath = useDispatch()
// const isLoading = useSelector(selecPhoneBookIsLoading)
// const isError = useSelector(selecPhoneBookIsError)
const contacts =useSelector(selecPhoneBookContacts)

useEffect(() => {
  dispath(apiGetContacts())
}, [dispath])

const onDeleteContact = (contactId) => {
dispath(apiRemoveContact(contactId))
}

  return (
    <div>
      <NewContact />
       {/* {isLoading && <Loader />}
      {isError && <ErrorMessage />} */}
      <ul>
        {Array.isArray(contacts) && contacts.length === 0 && <li>You dont have any contacts</li>}
      {Array.isArray(contacts) && contacts.map(item =><li key={item.id}>
        <h3>name: {item.name}<button type="button" onClick={()=>onDeleteContact(item.id)}>delete contact</button></h3>
        <p>number: {item.number}</p>
      </li> )}
      </ul>
     
    </div>
  )
}

export default ContactsPage


