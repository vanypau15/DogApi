import React from 'react';

function Homepage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Dog Adoption Center</h1>
            <p>Find your new best friend today!</p>
            <img
                src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
                alt="Happy dog"
                style={{ width: '300px', borderRadius: '10px', marginTop: '20px' }}
            />
        </div>
    );
}

export default Homepage;