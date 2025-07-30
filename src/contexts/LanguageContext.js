import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [languageData, setLanguageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load language data from localStorage and fetch JSON
  useEffect(() => {
    const loadLanguageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get language from localStorage (set by Python)
        const savedLanguage = localStorage.getItem('language') || 'en';
        setLanguage(savedLanguage);
        
        console.log('🌐 React: Loading language from localStorage...');
        console.log('🌐 React: savedLanguage =', savedLanguage);
        
        // Fetch language data from server
        const response = await fetch(`/langs/${savedLanguage}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setLanguageData(data);
        
        console.log('✅ Language data loaded successfully:', savedLanguage);
        console.log('📄 Language data:', data);
        
      } catch (err) {
        console.error('❌ Failed to load language data:', err);
        setError(err.message);
        
        // Fallback to English if loading fails
        try {
          const fallbackResponse = await fetch('/langs/en.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setLanguageData(fallbackData);
            setLanguage('en');
            console.log('🔄 Fallback to English language');
          }
        } catch (fallbackErr) {
          console.error('❌ Fallback language loading also failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    loadLanguageData();
  }, []);

  // Listen for language change events from Python
  useEffect(() => {
    const handleLanguageChange = (event) => {
      const { language: newLanguage, data } = event.detail;
      console.log('🔄 Language changed via event:', newLanguage);
      setLanguage(newLanguage);
      setLanguageData(data);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  // Helper function to get text from language data
  const getText = (key, section = 'neurobase_window') => {
    if (!languageData || !languageData[section]) {
      console.warn(`⚠️ Language data not available for section: ${section}`);
      return key; // Return key as fallback
    }
    
    const sectionData = languageData[section];
    const text = sectionData[key];
    
    if (!text) {
      console.warn(`⚠️ Text not found for key: ${key} in section: ${section}`);
      return key; // Return key as fallback
    }
    
    return text;
  };

  // Helper function to get text with parameters
  const getTextWithParams = (key, params = {}, section = 'neurobase_window') => {
    let text = getText(key, section);
    
    // Replace parameters in text
    Object.keys(params).forEach(param => {
      const placeholder = `{${param}}`;
      text = text.replace(placeholder, params[param]);
    });
    
    return text;
  };

  const value = {
    language,
    languageData,
    loading,
    error,
    getText,
    getTextWithParams,
    setLanguage: (newLanguage) => {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  return React.createElement(LanguageContext.Provider, { value }, children);
}; 