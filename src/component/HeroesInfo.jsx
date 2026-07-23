import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../HeroesInfo.css';

function HeroesInfo() {
    const { id } = useParams();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        fetch(`https://api.opendota.com/api/heroStats`)
            .then(res => res.json())
            .then(data => {
                const currentHero = data.find(h => h.id === parseInt(id));
                setHero(currentHero);
            });
    }, [id]);

    if (!hero) {
        return (
            <div className="hero-page-container">
                <div className="loading_text">Загрузка данных героя...</div>
            </div>
        );
    }

    const heroCleanName = hero.name.replace('npc_dota_hero_', '');
    const heroArtUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroCleanName}_vert.jpg`;

    const calcLevel30 = (base, gain) => Math.round(base + gain * 29);
    const winrate = hero.pro_pick ? ((hero.pro_win / hero.pro_pick) * 100).toFixed(1) : 0;
    const renderStars = (count) => '★'.repeat(count || 1) + '☆'.repeat(3 - (count || 1));
    const attrType = hero.primary_attr || 'agi';

    return (
        <div className="hero-page-container">
            <div className="hero-top-navigation">
                <Link to="/" className="main-back-btn">
                    <span>←</span> Назад к героям
                </Link>
                <div className="main-site-title">DOTA 2 <span className="title-glow">ANALYTICS</span></div>
            </div>

            <div className={`site-hero-card-main attr-${attrType}`}>

                <div className="hero-vertical-banner-wrap">
                    <img src={heroArtUrl} alt={hero.localized_name} className="hero-vertical-image" />
                    <div className="hero-image-overlay"></div>
                </div>

                <div className="hero-info-side">
                    <div className="hero-title-row">
                        <h1 className="hero-main-heading">{hero.localized_name}</h1>
                        <span className={`hero-attr-badge ${attrType}`}>{attrType.toUpperCase()}</span>
                    </div>

                    <div className="hero-sub-details">
                        <span className="hero-roles-text"><strong>Роли:</strong> {hero.roles ? hero.roles.join(', ') : 'Универсал'}</span>
                        <span className="hero-card-stars">Сложность: <span className="stars-val">{renderStars(hero.complexity)}</span></span>
                    </div>

                    {/* Характеристики на 30 уровень */}
                    <div className="site-stats-box">
                        <div className="site-box-title">📊 ХАРАКТЕРИСТИКИ НА 30 УРОВНЕ</div>
                        <div className="site-stat-line">
                            <span className="stat-label-item str">Сила:</span>
                            <span className="stat-calc-wrap">{hero.base_str} (+{hero.str_gain}) <span className="arrow-icon">➔</span> <strong className="highlight-val">{calcLevel30(hero.base_str, hero.str_gain)}</strong></span>
                        </div>
                        <div className="site-stat-line">
                            <span className="stat-label-item agi">Ловкость:</span>
                            <span className="stat-calc-wrap">{hero.base_agi} (+{hero.agi_gain}) <span className="arrow-icon">➔</span> <strong className="highlight-val">{calcLevel30(hero.base_agi, hero.agi_gain)}</strong></span>
                        </div>
                        <div className="site-stat-line">
                            <span className="stat-label-item int">Интеллект:</span>
                            <span className="stat-calc-wrap">{hero.base_int} (+{hero.int_gain}) <span className="arrow-icon">➔</span> <strong className="highlight-val">{calcLevel30(hero.base_int, hero.int_gain)}</strong></span>
                        </div>
                    </div>

                    <div className="site-stats-box">
                        <div className="site-box-title">⚔️ БОЕВЫЕ ПАРАМЕТРЫ</div>
                        <div className="site-combat-grid">
                            <div className="combat-param-item">Урон: <strong className="white-text">{hero.base_attack_min} — {hero.base_attack_max}</strong></div>
                            <div className="combat-param-item">Скорость: <strong className="white-text">{hero.move_speed}</strong></div>
                            <div className="combat-param-item">Броня: <strong className="white-text">{hero.base_armor}</strong></div>
                            <div className="combat-param-item">Дальность: <strong className="white-text">{hero.attack_range} ({hero.attack_type})</strong></div>
                        </div>
                    </div>
                </div>

                {/* НИЖНЯЯ ПАНЕЛЬ МЕТЫ */}
                <div className="site-meta-footer">
                    <div className="meta-item-box">
                        <span className="m-label">Pro Пики</span>
                        <span className="m-val">{hero.pro_pick ?? 0}</span>
                    </div>
                    <div className="meta-divider"></div>
                    <div className="meta-item-box">
                        <span className="m-label">Pro Баны</span>
                        <span className="m-val">{hero.pro_ban ?? 0}</span>
                    </div>
                    <div className="meta-divider"></div>
                    <div className="meta-item-box">
                        <span className="m-label">Винрейт на про-сцене</span>
                        <span className="m-val site-win-green">{winrate}%</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroesInfo;