import React, { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFormData({ 
        name: "", 
        email: "", 
        message: "" 
      })

      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
    })
  }

  return (
    <Layout>
      <Seo title="Contact us" />
      <div className={styles.textCenter}>
        <h1>
          Contact us
        </h1>

        {formSuccess ? 
          <div>{formSuccessMessage}</div>
          :
        <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}>
            <div>
              <label for="name">Name</label>
              <input type="text" name="name" onChange={handleInput} value={formData.name} />
            </div>

            <div>
              <label for="email">Email</label>
              <input type="text" name="email" onChange={handleInput} value={formData.email} />
            </div>

            <div>
              <label for="message">Message</label>
              <textarea name="message" onChange={handleInput} value={formData.message}></textarea>
            </div>

            <button type="submit">Send message</button>
          </form>
        }
      </div>
    </Layout>
  )
}

export default ContactPage
