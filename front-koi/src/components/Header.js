import '../styles/Header.css'

const Header = () => {
    return(
        <div className='header-container'>
        <ul class="horizontal-list">
            <li>
                <a className='letters' href="/login">LANZAMIENTO</a>
            </li>
              <li>
                <a className='letters' href="/login">COLECCIONES</a>
              </li>
              <li>
                <a className='letters' href="/login">PERSONALIZACIÓN</a>
              </li>
              <li>
              <a className='letters' href="/login">OFERTAS</a>
              </li>
            </ul>
        </div>
    )
};

export default Header;
