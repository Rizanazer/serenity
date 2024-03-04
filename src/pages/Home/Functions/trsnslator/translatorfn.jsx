import React, { useState } from 'react';
import translate from 'google-translate-api';

const TranslationComponent = ({ text, targetLanguage }) => {
  const [translatedText, setTranslatedText] = useState('');

  const translateText = () => {
    translate(text, { to: targetLanguage })
      .then(res => {
        setTranslatedText(res.text);
      })
      .catch(err => {
        console.error('Error translating text:', err);
      });
  };

  return (
    <div>
      <button onClick={translateText}>Translate</button>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslationComponent;
