import styles from './Header.module.css'

function Header(){
    return(
        <header>
            <h1 className={styles.title}>PhysiSim: An Interactive Physics Simulator</h1>
        </header>
    );
}

export default Header;