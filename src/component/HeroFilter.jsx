import 'react';
import '../App.css'

export default function HeroFilter({ onRoleChange, onAttackChange }) {
    return (
        <div className="filter-wrapper">

            {/* Селект для роли */}
            <div className="filter select-container">
                <label className="select-label">ROLE</label>

                <div className="select-wrapper">
                    <select
                        className="native-select"
                        onChange={(e) => onRoleChange(e.target.value)}
                        defaultValue="all"
                    >
                        <option value="all">All Roles</option>
                        <option value="Carry">Carry</option>
                        <option value="Support">Support</option>
                        <option value="Durable">Durable</option>
                        <option value="Initiator">Initiator</option>
                    </select>
                    {/* Наша кастомная стрелочка */}
                    <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                </div>
            </div>

            {/* Селект для типа атаки */}
            <div className="filter select-container">
                <label className="select-label">ATTACK</label>
                <div className="select-wrapper">
                    <select
                        className="native-select"
                        onChange={(e) => onAttackChange(e.target.value)}
                        defaultValue="all"
                    >
                        <option value="all">All Attacks</option>
                        <option value="Melee">Melee</option>
                        <option value="Ranged">Ranged</option>
                    </select>
                    {/* Наша кастомная стрелочка */}
                    <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                </div>
            </div>

        </div>
    );
}