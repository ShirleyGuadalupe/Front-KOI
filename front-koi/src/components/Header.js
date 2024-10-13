import '../styles/Header.css'

const Header = () => {
    return(
      <header>
        <div className='top-bar'>
          <div>
            <a href="https://www.instagram.com/koi_alternative/profilecard/?igsh=N2Q3azczdG51ZHF2" target='blank'><img className="social-icons" src="https://cdn-icons-png.flaticon.com/128/3670/3670274.png" alt="Instagram" /></a>
            <a href="https://www.facebook.com/KOIALTERNATIVE?mibextid=ZbWKwL" target="blank"><img className='social-icons' src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png" alt="Facebook" /></a>
            <a href="https://api.whatsapp.com/send?phone=3176482938&text=Holaa" target="blank"><img className='social-icons' src="https://cdn-icons-png.flaticon.com/128/1384/1384007.png" alt="WhatsApp" /></a>
            <a href="https://www.tiktok.com/@koialternative?_t=8qW18k2Rxw5&_r=1" target='blank'><img className='social-icons' src="https://cdn-icons-png.flaticon.com/128/3116/3116491.png" alt="TikTok" /></a>
          </div>
          <div>
            <a href="/register" className="btn-bar">Crear Cuenta</a>
            <a href="/login" className="btn-bar-login">Iniciar Sesión</a>
          </div>
        </div>
        <nav className="main-nav">
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
        </nav>  
      </header>   
    )
};

export default Header;
