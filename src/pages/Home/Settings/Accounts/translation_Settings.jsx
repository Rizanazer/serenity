import React, { useState } from 'react';
import axios from 'axios';

function TranslateSettings({language,setLanguage,outText, setOutText,text, setText}) {
     // Default language

     const handleSelectChange = (event) => {
        setLanguage(event.target.value);
      }
    

    return (

        <div className="box basicprofileinfo flex flexcolumn gap10">
            <div className="flex flexrow gap10 center">
                <span className="light">Choose Language to be Translated:</span>
                <select id='dropmenu' onChange={handleSelectChange}>
                                  {<option value="en">English</option>}
                                  {<option value="es">Spanish</option>}
                                  <option value="ml">Malayalam</option>
                                  <option value="ta">Tamil</option>
                                  <option value="ar">Arabic</option>
                                </select>
            </div>
        </div>
    );
}

export default TranslateSettings;
