import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../context/PetContext";
import { Paper, Table, TableRow, TableBody, TableCell, TableHead, Typography, Button } from "@mui/material";

export default function PetTable() {

    const { pets, deletePet } = useContext(PetContext);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if(confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
            deletePet(id);
            toast.success("Mascota eliminada con éxito");
        }
    };

    return (
        <Paper>
            <Typography variant="h6">Lista de Mascotas</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Edad</TableCell>
                        <TableCell>Raza</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pets.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No hay mascotas disponibles
                            </TableCell>
                        </TableRow>
                    ) : (
                        pets.map((pet) => (
                            <TableRow key={pet.id}>
                                <TableCell>{pet.nombre}</TableCell>
                                <TableCell>{pet.edad}</TableCell>
                                <TableCell>{pet.raza}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/edit/${pet.id}`)}>Editar</Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(pet.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}