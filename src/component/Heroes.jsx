import { useEffect, useState } from "react";
import HeroesList from "./HeroesList.jsx";
import HeroesSearchFilter from "./HeroesSearchFilter.jsx";
import { useSearchParams } from "react-router-dom";

const Heroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [searchHeroes, setSearchHeroes] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedAttack, setSelectedAttack] = useState('all');
    const [selectedAttr, setSelectedAttr] = useState('all');
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();


    const [comparedHeroes, setComparedHeroes] = useState([]);

    const handleToggleCompare = (hero) => {
        if (comparedHeroes.some(h => h.id === hero.id)) {
            setComparedHeroes(comparedHeroes.filter(h => h.id !== hero.id));
        } else {
            if (comparedHeroes.length < 2) {
                setComparedHeroes([...comparedHeroes, hero]);
            } else {
                setComparedHeroes([comparedHeroes[1], hero]);
            }
        }
    };

    const handleFilterChange = (setter, value) => {
        setter(value);
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    const clearSearchHeroes = searchHeroes.trim().toLowerCase();

    const filterSearch = heroes.filter((hero) => {
        const clearSearchHero = hero.localized_name?.toLowerCase().includes(clearSearchHeroes);
        const matchRoles = selectedRole === 'all' || hero.roles?.includes(selectedRole);
        const matchAttack = selectedAttack === 'all' || hero.attack_type?.toLowerCase().includes(selectedAttack.toLowerCase());
        const matchAttr = selectedAttr === 'all' || hero.primary_attr === selectedAttr;

        return clearSearchHero && matchRoles && matchAttack && matchAttr;
    });

    const attributeIcons = {
        str: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png',
        agi: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png',
        int: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png',
        all: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_universal.png'
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://api.opendota.com/api/heroStats')
            .then(res => {
                if (!res.ok) throw new Error("Ошибка сервера OpenDota");
                return res.json();
            })
            .then(statsJson => {
                const mergedHeroes = statsJson.map(hero => {
                    let complexity = 1;
                    if (hero.roles.length >= 6) {
                        complexity = 3;
                    } else if (hero.roles.length > 4) {
                        complexity = 2;
                    }
                    return { ...hero, complexity };
                });
                setHeroes(mergedHeroes);
            })
            .catch(error => console.error("Ошибка при получении данных:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="app-wrapper">
            <div className="container">
                <HeroesSearchFilter
                    attributeIcons={attributeIcons}
                    setSearchHeroes={(val) => handleFilterChange(setSearchHeroes, val)}
                    searchHeroes={searchHeroes}
                    setSelectedRole={(val) => handleFilterChange(setSelectedRole, val)}
                    setSelectedAttack={(val) => handleFilterChange(setSelectedAttack, val)}
                    selectedAttr={selectedAttr}
                    setSelectedAttr={(val) => handleFilterChange(setSelectedAttr, val)}
                />

                {loading ? (
                    <div className="Loader">Загрузка героев...</div>
                ) : (
                    <HeroesList
                        attributeIcons={attributeIcons}
                        heroes={heroes}
                        filterSearch={filterSearch}
                        comparedHeroes={comparedHeroes}
                        onToggleCompare={handleToggleCompare}
                    />
                )}
            </div>
        </div>
    );
};

export default Heroes;