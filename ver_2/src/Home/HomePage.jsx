import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {
    return(
        <div>
            <h1>HomePage.jsx</h1>
            <Link to="/">
                <h1>페이지 이름</h1>
            </Link>
        </div>
    )
}

export default HomePage;