import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {

    return(
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">CRUD Pet</Typography>
                <div>
                    <Button color="inherit" component={Link} to="/">Ver Mascotas</Button>
                    <Button color="inherit" component={Link} to="/add">Agregar Mascota</Button>
                </div>
            </Toolbar>
        </AppBar>
    );


}