import React from "react"
import {navigate} from "gatsby"

export default function Home() {
    typeof window !== 'undefined' && navigate("/main");
    return null;
}