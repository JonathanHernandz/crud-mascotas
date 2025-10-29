import { Paper, Typography, TextField, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PetContext } from "../context/PetContext";

export default function PetForm() {
  const { pets, addPet, editPet } = useContext(PetContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Buscar mascota existente en la lista global
  const existingPet = pets.find((p) => p.id === Number(id));

  // ✅ Estado local de la mascota (nuevo o existente)
  const [pet, setPet] = useState(existingPet || { nombre: "", edad: "", raza: "" });

  // ✅ Si se cambia el id o la mascota, actualizar el estado
  useEffect(() => {
    if (existingPet) setPet(existingPet);
  }, [existingPet]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pet.nombre || !pet.edad || !pet.raza) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    if (existingPet) {
      editPet(existingPet.id, pet);
      toast.success("Mascota actualizada con éxito");
    } else {
      addPet(pet);
      toast.success("Mascota agregada con éxito");
    }

    navigate("/");
  };

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {existingPet ? "Editar Mascota" : "Agregar Mascota"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={pet.nombre}
          onChange={(e) => setPet({ ...pet, nombre: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Edad"
          value={pet.edad}
          onChange={(e) => setPet({ ...pet, edad: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Raza"
          value={pet.raza}
          onChange={(e) => setPet({ ...pet, raza: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
        >
          {existingPet ? "Guardar Cambios" : "Agregar"}
        </Button>
      </form>
    </Paper>
  );
}
