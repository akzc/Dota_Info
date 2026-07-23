import { Outlet, NavLink, useLocation } from "react-router-dom";
import dota_2 from '../images/dota_2.png';

function HeroesElement() {
    const location = useLocation();
    const isHeroInfoPage = location.pathname.includes('/HeroList/');

    return (
        <>
            {!isHeroInfoPage && (
                <div className="div_container">
                    <div className='nav container'>
                        <div className={'bloc_container'}>
                            <div className={'bloc_logo'}>
                                <div className={'dota_badge'}>
                                    <img
                                        src={dota_2}
                                        alt="Dota 2 Logo"
                                        className="dota_badge_icon"
                                    />
                                </div>

                                <div className="logo">
                                    <span className="logo_title">DOTA 2</span>
                                    <span className={'logo_subtitle'}>HERO DATABASE</span>
                                </div>
                            </div>

                            <div className={'dota_badge_Link'} >
                                <NavLink to="/" end>HEROES</NavLink>
                                <NavLink to="/settings">SETTINGS</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Outlet />
        </>
    );
}

export default HeroesElement;