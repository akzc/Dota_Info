import { useState, useEffect } from 'react';


const Settings = () => {
    // Получаем сохраненную тему из localStorage или ставим темную по умолчанию
    const [theme, setTheme] = useState(localStorage.getItem('dota_theme') || 'dark');

    useEffect(() => {
        // Устанавливаем атрибут темы на HTML-элемент
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('dota_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className="app-wrapper">
            <div className="container">
                <div className="settings-card">
                    <h2>Settings</h2>
                    <div className="setting-item">
                        <span>Application Theme</span>
                        <button className="theme-toggle-btn" onClick={toggleTheme}>
                            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;