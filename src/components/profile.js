import React from "react"
import {getUser} from "../services/auth";

const Profile = () => {
    const {city, company_name, email_address, first_name, last_name} = getUser();
    return (
        <>
            <h1>Your profile</h1>
            <ul>
                <li>first name: {first_name}</li>
                <li>last name: {last_name}</li>
                <li>company: {company_name}</li>
                <li>city: {city}</li>
                <li>email address: {email_address}}</li>
            </ul>
        </>
    );
}
export default Profile