import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import './Main.css'
export default function Main(){
    return(
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar state={{username:"" } }/>
                </Grid>
                <Grid item xs={5}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={7}>
                    <div className="right">
                        <img src="https://www.indusind.com/content/dam/indusind-corporate/whatsapp-banking/girlnmobile.png"></img>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
