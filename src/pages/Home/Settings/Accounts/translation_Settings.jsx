import React, { useState } from 'react';
import axios from 'axios';

function TranslateSettings() {
    const [text, setText] = useState("");
    const [outText, setOutText] = useState("");
    const [language, setLanguage] = useState("en"); // Default language

    const handleText = (event) => {
        setText(event.target.value);
    }

    const handleSelectChange = (event) => {
        setLanguage(event.target.value);
    }

    const handleTranslate = () => {
        axios.post('/convert', {
            input_text: text,
            to_lang: language
        })
            .then(response => {
                setOutText(response.data.translated_text);
            })
            .catch(error => {
                console.error('Error:', error);
                setOutText('Error occurred while translating');
            });
    }

    const handleClear = () => {
        setText("");
        setOutText("");
    }

    return (

        <div className="box basicprofileinfo flex flexcolumn gap10">
            <div className="flex flexrow gap10 center">
                <span className="light">Choose Language to be Translated:</span>
                <select id='dropmenu' onChange={handleSelectChange}>
                    <option value="es">Spanish</option>
                    <option value="ml">Malayalam</option>
                    <option value="ta">Tamil</option>
                    <option value="ar">Arabic</option>
                </select>
            </div>
            <p ></p>



        </div>


    );
}

export default TranslateSettings;
