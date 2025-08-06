import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Fallback English language data built-in
const fallbackEnglishData = {
  "neurobase_window": {
    "title": "Neurobase",
    "telephone": "Telephone",
    "reunions": "Reunions",
    "archives": "Archives",
    "emails": "Emails",
    "agenda": "Agenda",
    "colis": "Packages",
    "commandes": "Orders",
    "accueil": "Home",
    "menu": "Menu",
    "home": "Home",
    "back": "Back",
    "adjust_cursor_size": "Adjust cursor size",
    "archives_opened": "Archives opened successfully! 📁",
    "archives_failed": "Could not open Archives",
    "telephone_opened": "Telephone system opened! 📞",
    "telephone_failed": "Could not open telephone system",
    "reunions_opened": "Reunions & Meetings opened! 👥",
    "reunions_failed": "Could not open Reunions & Meetings",
    "accueil_opened": "Home opened! 🏠",
    "accueil_failed": "Could not open Home",
    "commandes_opened": "Orders opened! 📋",
    "commandes_failed": "Could not open Orders",
    "emails_opened": "Emails opened! 📧",
    "emails_failed": "Could not open Emails",
    "agenda_opened": "Agenda opened! 📅",
    "agenda_failed": "Could not open Agenda",
    "colis_opened": "Packages opened! 📦",
    "colis_failed": "Could not open Packages",
    "navigating_back": "Navigating back... ⬅️",
    "back_failed": "Could not go back",
    "progress_updated": "Progress updated: {value}% 📊",
    "progress_failed": "Could not update progress",
    "menu_opened": "Menu opened! 📋",
    "menu_failed": "Could not open menu",
    "mode_changed": "Mode changed to: {mode} 🎨",
    "mode_failed": "Could not change mode",
    "testing_close": "Testing window close... 🧪",
    "test_failed": "Could not test close"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [languageData, setLanguageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load language data from localStorage and fetch JSON - OPTIMIZED
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
        
        // Try to fetch language data from server with timeout
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
          
          const response = await fetch(`/langs/${savedLanguage}.json`, {
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setLanguageData(data);
          
          console.log('✅ Language data loaded from server:', savedLanguage);
          console.log('📄 Language data:', data);
        } catch (serverError) {
          console.warn('⚠️ Server not available, using fallback English data:', serverError.message);
          
          // Use built-in English fallback data
          setLanguageData(fallbackEnglishData);
          setLanguage('en'); // Force English
          console.log('🔄 Using built-in English fallback data');
        }
        
      } catch (err) {
        console.error('❌ Failed to load language data:', err);
        setError(err.message);
        // Use fallback data on error
        setLanguageData(fallbackEnglishData);
        setLanguage('en');
      } finally {
        setLoading(false);
      }
    };

    loadLanguageData();
  }, []); // Only run once on mount

  // Memoized language change handler
  const handleLanguageChange = useMemo(() => (event) => {
    const newLanguage = event.detail;
    console.log('🌐 React: Language change event received:', newLanguage);
    
    if (newLanguage && newLanguage !== language) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      
      // Reload language data for new language
      const loadNewLanguageData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/langs/${newLanguage}.json`);
          if (response.ok) {
            const data = await response.json();
            setLanguageData(data);
            console.log('✅ New language data loaded:', newLanguage);
          } else {
            console.warn('⚠️ Failed to load new language, keeping current data');
          }
        } catch (error) {
          console.error('❌ Error loading new language data:', error);
          // Keep current language data on error
        } finally {
          setLoading(false);
        }
      };
      
      loadNewLanguageData();
    }
  }, [language]);

  // Memoized text getter functions
  const getText = useMemo(() => (key, section = 'neurobase_window') => {
    if (!languageData) {
      return fallbackEnglishData[section]?.[key] || key;
    }
    return languageData[section]?.[key] || fallbackEnglishData[section]?.[key] || key;
  }, [languageData]);

  const getTextWithParams = useMemo(() => (key, params = {}, section = 'neurobase_window') => {
    let text = getText(key, section);
    
    // Replace parameters in the text
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
    });
    
    return text;
  }, [getText]);

  const value = useMemo(() => ({
    language,
    languageData,
    loading,
    error,
    getText,
    getTextWithParams,
    handleLanguageChange
  }), [language, languageData, loading, error, getText, getTextWithParams, handleLanguageChange]);

  return React.createElement(LanguageContext.Provider, { value }, children);
}; 