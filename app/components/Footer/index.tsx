import { AluraLogo } from "../AluraLogo/Index";
import footerStyles from "./footer.module.css"

 export function Footer() {
    return(
     <footer className={footerStyles.footer}>
        <AluraLogo/>
        <p>
            Orgulhosamente criado por <br/>Arthur com a Alura
        </p>
    </footer>
    )
 }
