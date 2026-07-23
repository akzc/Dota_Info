const HeroesItems = (props) => {
    const { attributeIcons, id, localized_name, img, name, roles, complexity, primary_attr, isCompared, onToggleCompare } = props;

    const heroComplexity = complexity || 1;
    const formattedRoles = roles ? roles.join(', ') : '';

    return (
        <div id={id} className={'heroes'}>
            <div className="hero_image_container">
                <img className={'heroes_img'} src={`https://cdn.cloudflare.steamstatic.com${img}`} alt={name} />
                <div className="hero_card_gradient"></div>
                <img className={'heroes_attr_icon'} src={attributeIcons[primary_attr]} alt={primary_attr} />

                {/* Кнопка сравнения */}
                <button
                    className={`compare_card_btn ${isCompared ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleCompare(props);
                    }}
                    title={isCompared ? "Убрать из сравнения" : "Сравнить героя"}
                >
                    {isCompared ? '✓' : '+'}
                </button>

                <div className={'heroes_name'}>{localized_name}</div>
            </div>

            <div className="hero_card_content">
                <div className={'heroes_roles'} title={formattedRoles}>
                    <span>Роли:</span> {formattedRoles}
                </div>
                <hr className={'hr'} />
                <div className={'complexity'}>
                    <span>Сложность</span>
                    <span className={'complexity_p'}>
                        {'★'.repeat(heroComplexity)}{'☆'.repeat(3 - heroComplexity)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HeroesItems;