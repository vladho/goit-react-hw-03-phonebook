import "./App.css"
import react, { Component } from "react"
import Phonebook from "./components/Phonebook/Phonebook"
import Contacts from "./components/Contacts/Contacts"
import Section from "./components/Section/Section"
import { v4 as uuidv4 } from "uuid"
import Filter from "./components/Filter/Filter"

class App extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
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
