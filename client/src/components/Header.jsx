import React from 'react';

import Navigation from './Navigation'

export default function Header() {
    return (
        <header className="display-flex border-style border-radius"> 
            <h1>On The Line</h1>
            < Navigation />
        </header>
    );
}