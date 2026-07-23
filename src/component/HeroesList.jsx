import { Link, useSearchParams } from "react-router-dom";
import HeroesItems from "./HeroesItems.jsx";
import arrowLeft from '../images/gemini-svg_1.svg';
import arrowRight from '../images/gemini-svg_2.svg';
import { useState } from "react";

const HeroesList = (props) => {
    const { attributeIcons, filterSearch, comparedHeroes, onToggleCompare } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [showCompareModal, setShowCompareModal] = useState(false);

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentHeroes = filterSearch.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filterSearch.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        searchParams.set('page', pageNumber.toString());
        setSearchParams(searchParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (filterSearch?.length === 0) {
        return <div className={'isEmptyFilterSearch'}>Герои не найдены</div>;
    }

    const h1 = comparedHeroes[0];
    const h2 = comparedHeroes[1];

    const getAvgDamage = (h) => h ? Math.round(((h.base_attack_min || 0) + (h.base_attack_max || 0)) / 2) : 0;

    // Расширенный набор параметров для детального сравнения
    const statsConfig = h1 && h2 ? [
        { category: 'Основные характеристики' },
        { label: 'Сила', val1: h1.base_str || 0, val2: h2.base_str || 0, higherIsBetter: true, max: 40 },
        { label: 'Прирост силы', val1: h1.str_gain || 0, val2: h2.str_gain || 0, higherIsBetter: true, max: 5 },
        { label: 'Ловкость', val1: h1.base_agi || 0, val2: h2.base_agi || 0, higherIsBetter: true, max: 40 },
        { label: 'Прирост ловкости', val1: h1.agi_gain || 0, val2: h2.agi_gain || 0, higherIsBetter: true, max: 5 },
        { label: 'Интеллект', val1: h1.base_int || 0, val2: h2.base_int || 0, higherIsBetter: true, max: 40 },
        { label: 'Прирост интеллекта', val1: h1.int_gain || 0, val2: h2.int_gain || 0, higherIsBetter: true, max: 5 },

        { category: 'Боевые параметры' },
        { label: 'Урон', val1: getAvgDamage(h1), val2: getAvgDamage(h2), higherIsBetter: true, max: 90 },
        { label: 'Скорость атаки (BAT)', val1: h1.base_attack_time || 1.7, val2: h2.base_attack_time || 1.7, higherIsBetter: false, max: 2 },
        { label: 'Дальность атаки', val1: h1.attack_range || 150, val2: h2.attack_range || 150, higherIsBetter: true, max: 700 },
        { label: 'Броня', val1: h1.base_armor || 0, val2: h2.base_armor || 0, higherIsBetter: true, max: 10 },
        { label: 'Скорость движения', val1: h1.move_speed || 300, val2: h2.move_speed || 300, higherIsBetter: true, max: 330 },
        { label: 'Скорость поворота', val1: h1.turn_rate || 0.5, val2: h2.turn_rate || 0.5, higherIsBetter: true, max: 1 },

        { category: 'Сложность' },
        { label: 'Сложность', val1: h1.complexity || 1, val2: h2.complexity || 1, higherIsBetter: false, max: 3 }
    ] : [];

    return (
        <div>
            <div className={"heroes_list"}>
                {currentHeroes.map((hero) => {
                    const isCompared = comparedHeroes.some(h => h.id === hero.id);
                    return (
                        <Link key={hero.id} to={`/HeroList/${hero.id}`}>
                            <HeroesItems
                                attributeIcons={attributeIcons}
                                {...hero}
                                isCompared={isCompared}
                                onToggleCompare={onToggleCompare}
                            />
                        </Link>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Предыдущая страница"
                    >
                        <img src={arrowLeft} alt="" />
                    </button>

                    <span className="pagination_info">
                        Страница {currentPage} из {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Следующая страница"
                    >
                        <img src={arrowRight} alt="" />
                    </button>
                </div>
            )}

            {comparedHeroes.length > 0 && (
                <div className="comparison_bar">
                    <div className="comparison_heroes_preview">
                        {comparedHeroes.map(hero => (
                            <div key={hero.id} className="comparison_preview_item">
                                <img src={`https://cdn.cloudflare.steamstatic.com${hero.img}`} alt={hero.localized_name} />
                                <span>{hero.localized_name}</span>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleCompare(hero);
                                }}>×</button>
                            </div>
                        ))}
                        {comparedHeroes.length < 2 && (
                            <div className="comparison_placeholder">Выберите еще одного героя</div>
                        )}
                    </div>
                    {comparedHeroes.length === 2 && (
                        <button className="open_compare_modal_btn" onClick={() => setShowCompareModal(true)}>
                            Сравнить
                        </button>
                    )}
                </div>
            )}

            {showCompareModal && h1 && h2 && (
                <div className="compare_modal_backdrop" onClick={() => setShowCompareModal(false)}>
                    <div className="compare_modal_content" onClick={e => e.stopPropagation()}>
                        <div className="compare_modal_header_top">
                            <h2>Сравнение характеристик</h2>
                            <button
                                style={{background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer'}}
                                onClick={() => setShowCompareModal(false)}
                            >×</button>
                        </div>

                        <div className="compare_heroes_header">
                            <div className="compare_hero_head_col">
                                <img src={`https://cdn.cloudflare.steamstatic.com${h1.img}`} alt={h1.localized_name} />
                                <div className="compare_hero_info">
                                    <h3>{h1.localized_name}</h3>
                                    <span>{h1.primary_attr.toUpperCase()} · {h1.attack_type}</span>
                                </div>
                            </div>
                            <div className="compare_hero_head_col">
                                <img src={`https://cdn.cloudflare.steamstatic.com${h2.img}`} alt={h2.localized_name} />
                                <div className="compare_hero_info">
                                    <h3>{h2.localized_name}</h3>
                                    <span>{h2.primary_attr.toUpperCase()} · {h2.attack_type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="compare_table">
                            {statsConfig.map((item, idx) => {
                                if (item.category) {
                                    return <div key={idx} className="compare_category_title">{item.category}</div>;
                                }

                                const { label, val1, val2, higherIsBetter, max } = item;

                                let isBetter1 = false;
                                let isBetter2 = false;
                                let color1 = '#f1f5f9';
                                let color2 = '#f1f5f9';
                                let arrow1 = '';
                                let arrow2 = '';

                                if (val1 !== val2) {
                                    if (higherIsBetter) {
                                        isBetter1 = val1 > val2;
                                        isBetter2 = val2 > val1;
                                    } else {
                                        isBetter1 = val1 < val2;
                                        isBetter2 = val2 < val1;
                                    }
                                }

                                if (isBetter1) {
                                    color1 = '#22c55e';
                                    color2 = '#ef4444';
                                    arrow1 = '↑';
                                    arrow2 = '↓';
                                } else if (isBetter2) {
                                    color1 = '#ef4444';
                                    color2 = '#22c55e';
                                    arrow1 = '↓';
                                    arrow2 = '↑';
                                }

                                const percent1 = Math.min(Math.max((val1 / max) * 100, 5), 100);
                                const percent2 = Math.min(Math.max((val2 / max) * 100, 5), 100);

                                return (
                                    <div key={idx} className="compare_row">
                                        <div className="compare_val_side left" style={{ color: color1 }}>
                                            <span className="compare_number">{val1}</span>
                                            {arrow1 && <span style={{ fontSize: '14px' }}>{arrow1}</span>}
                                            <div className="compare_bar_track">
                                                <div className="compare_bar_fill" style={{ width: `${percent1}%`, background: color1 }}></div>
                                            </div>
                                        </div>

                                        <div className="compare_stat_name">{label}</div>

                                        <div className="compare_val_side right" style={{ color: color2 }}>
                                            <span className="compare_number">{val2}</span>
                                            {arrow2 && <span style={{ fontSize: '14px' }}>{arrow2}</span>}
                                            <div className="compare_bar_track">
                                                <div className="compare_bar_fill" style={{ width: `${percent2}%`, background: color2 }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button className="close_modal_btn" onClick={() => setShowCompareModal(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroesList;