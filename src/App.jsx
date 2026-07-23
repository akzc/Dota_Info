import './App.css';
import { Route, Routes } from "react-router-dom";
import HeroesElement from "./component/HeroesElement.jsx";
import Heroes from "./component/Heroes.jsx";
import HeroesInfo from "./component/HeroesInfo.jsx";
import Settings from "./component/Settings/Settings.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HeroesElement/>}>
                <Route index element={<Heroes/>} />
                <Route path="HeroList/:id" element={<HeroesInfo />} />
                <Route path="settings" element={<Settings/>} />
            </Route>
        </Routes>
    );
}

export default App;