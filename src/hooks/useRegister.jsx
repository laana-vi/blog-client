import { useState } from "react"

export const useRegister = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')


    return [email, setEmail, username, setUsername, firstName, setFirstName, lastName, setLastName, dateOfBirth, setDateOfBirth, password, setPassword]
}