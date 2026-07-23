import searchIcon from '../images/search.svg'

const HeroesSearch = (props) => {
    const {onInput,value} = props
    return (
        <form className={'search-form'} action="">
            <input type="search" className="search-heroes" onInput={(event)=> {
                onInput(event.target.value)
            }} value={value} placeholder="Search Hero Name..." />
            <img className={'search-img'} src={searchIcon} alt=""/>
        </form>
    )
}
export default HeroesSearch