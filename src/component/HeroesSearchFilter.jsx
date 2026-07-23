import HeroesSearch from "./HeroesSearch.jsx";
import HeroFilter from "./HeroFilter.jsx";

const HeroesSearchFilter = (props) => {
    const { attributeIcons, setSearchHeroes, searchHeroes, setSelectedRole, setSelectedAttack, selectedAttr, setSelectedAttr } = props;

    const handleAttrClick = (attrName) => {
        if (selectedAttr === attrName) {
            setSelectedAttr('all');
        } else {
            setSelectedAttr(attrName);
        }
    };

    return (
        <div className="HeroesSearchFilter">
            <HeroesSearch onInput={setSearchHeroes} value={searchHeroes} />
            <HeroFilter onRoleChange={setSelectedRole} onAttackChange={setSelectedAttack} />

            <div className="attr_buttons_container">
                {Object.entries(attributeIcons).map(([attrName, imgUrl]) => {
                    const isActive = selectedAttr === attrName;
                    return (
                        <button
                            onClick={() => handleAttrClick(attrName)}
                            className={`attribute_btn ${isActive ? 'active' : ''}`}
                            key={attrName}
                            title={attrName.toUpperCase()}
                        >
                            <img className={'attribute'} src={imgUrl} alt={`${attrName} icon`} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroesSearchFilter;