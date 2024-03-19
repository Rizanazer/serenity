import React, { useState, useEffect } from 'react';

const UserProfileForm = () => {
    const [userProfile, setUserProfile] = useState({});
    const [recommendedGroups, setRecommendedGroups] = useState([]);

    useEffect(() => {
        const userDataString = localStorage.getItem('userdata');
        if (userDataString) {
            try {
                const userdata = JSON.parse(userDataString);
                setUserProfile({ likes: userdata.likes, dislikes: userdata.dislikes, hobbies: userdata.hobbies });
                console.log(userProfile);
            } catch (error) {
                console.error('Error parsing userdata:', error);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        console.log("udddddddddddddddddddddddddddddddddddd")
        console.log(userProfile)
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/recommend_groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_profile: userProfile }),
        });
        const data = await response.json();
        setRecommendedGroups(data.recommended_groups || []);
    };
    // const handleSubmit = async (e) => {
    //     console.log("udddddddddddddddddddddddddddddddddddd")
    //     console.log(userProfile)
    //     e.preventDefault();
    //     const response = await fetch('http://127.0.0.1:8000/recommend_groups', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ user_profile: userProfile }),
    //     });
    //     const data = await response.json();
    //     setRecommendedGroups(data.recommended_groups || []);
    // };

    return (
        <div>
            <h1>User Profile Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Your form fields to collect user profile information */}
                <button type="submit">Submit</button>
            </form>
            <h2>Recommended Groups:</h2>
            <ul>
                {recommendedGroups.map((group, index) => (
                    <li key={index}>{group}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfileForm;
