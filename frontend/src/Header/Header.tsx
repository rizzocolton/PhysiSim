import styles from './Header.module.css'

type HeaderProps={
    title:string
}


function Header(props:HeaderProps){
    return(
        <header>
            <h1 className={styles.title}>{props.title}</h1>
        </header>
    );
}

export default Header;