import React from 'react';
import {Link} from 'react-router-dom';

export default function landingPage(){
    return (
        <div>
        <h1>Bienvenidos a mi Landing Page</h1>
        <Link to = '/home'>
            <button>Home</button>
            </Link>
        </div>

    )
}