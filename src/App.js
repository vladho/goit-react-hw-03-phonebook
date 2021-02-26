import "./App.css"
import { Component } from "react"
import Phonebook from "./components/Phonebook/Phonebook"
import Contacts from "./components/Contacts/Contacts"
import Section from "./components/Section/Section"
import Filter from "./components/Filter/Filter"

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts")
    const parseContacts = JSON.parse(contacts)

    if (parseContacts) {
      this.setState({ contacts: parseContacts })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("sdf")
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }
  submitForm = (data) => {
    const checkOnOriginal = this.state.contacts.find((el) => data.name.toLowerCase() === el.name.toLowerCase())
    if (checkOnOriginal) {
      alert(`${data.name} is already in contacts`)
      return
    } else {
      this.setState({ contacts: [...this.state.contacts, data] })
    }
  }

  filterForm = (e) => {
    this.setState({ filter: e.target.value })
  }

  visiableContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase()
    return this.state.contacts.filter((el) => el.name.toLowerCase().includes(normalizedFilter))
  }
  deleteContact = (data) => {
    this.setState({
      contacts: this.state.contacts.filter((el) => el.id !== data.id),
    })
  }

  render() {
    return (
      <>
        <Section title="Phonebook">
          <Phonebook onSubmit={this.submitForm} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.filterForm} />
          <ul className="contacts__name">
            {this.visiableContact().map((el) => (
              <Contacts key={el.id} contacts={el} deleteContact={this.deleteContact} />
            ))}
          </ul>
        </Section>
      </>
    )
  }
}

export default App
