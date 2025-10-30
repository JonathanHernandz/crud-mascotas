import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { PetContext } from "../context/PetContext";
import breedsData from "../data/breeds.json"; // ✅ Lista base de razas

export default function PetForm() {
  const { pets, addPet, editPet } = useContext(PetContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const existingPet = id ? pets.find((p) => p.id === Number(id)) : null;

  const [pet, setPet] = useState(
    existingPet || { nombre: "", edad: "", raza: "" }
  );

  const [isOther, setIsOther] = useState(false); // ✅ Si marca “otro”
  const [customRaza, setCustomRaza] = useState(""); // ✅ Valor manual
  const sortedBreeds = [...breedsData].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (existingPet) {
      setPet(existingPet);

      // ✅ Si la raza no está en la lista, activar modo "otro"
      if (!breedsData.includes(existingPet.raza)) {
        setIsOther(true);
        setCustomRaza(existingPet.raza);
      } else {
        setIsOther(false);
        setCustomRaza("");
      }
    }
  }, [existingPet]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validaciones básicas
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(pet.nombre.trim())) {
      toast.error("El nombre solo debe contener letras.");
      return;
    }

    if (isNaN(pet.edad) || pet.edad <= 0) {
      toast.error("La edad debe ser un número positivo.");
      return;
    }

    const razaFinal = isOther ? customRaza.trim() : pet.raza;
    if (!razaFinal) {
      toast.error("Selecciona o escribe una raza.");
      return;
    }

    const updatedPet = { ...pet, raza: razaFinal };

    if (existingPet) {
      editPet(existingPet.id, updatedPet);
      toast.success("Mascota actualizada con éxito");
    } else {
      addPet(updatedPet);
      toast.success("Mascota agregada con éxito");
    }

    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card className="shadow p-4 w-100" style={{ maxWidth: "700px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4 fw-bold fs-4">
            {existingPet ? "Editar Mascota" : "Agregar Mascota"}
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            {/* 🐾 Nombre */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={pet.nombre}
                onChange={(e) =>
                  setPet({ ...pet, nombre: e.target.value })
                }
                placeholder="Nombre de la Mascota"
                required
              />
            </Form.Group>

            {/* 🎂 Edad */}
            <Form.Group className="mb-3">
              <Form.Label>Edad (años)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="1"
                value={pet.edad}
                onChange={(e) =>
                  setPet({ ...pet, edad: e.target.value })
                }
                placeholder="Edad en años"
                required
              />
            </Form.Group>

            {/* 🐶 Raza */}
            <Form.Group className="mb-3">
              <Form.Label>Raza</Form.Label>

              {!isOther && (
                <Form.Select
                  className="form-select-sm w-100"
                  value={pet.raza}
                  onChange={(e) => setPet({ ...pet, raza: e.target.value })}
                  disabled={isOther}
                  required
                >
                  <option value="">Selecciona una raza...</option>
                  {sortedBreeds.map((breed, index) => (
                    <option key={index} value={breed}>
                      {breed}
                    </option>
                  ))}
                </Form.Select>
              )}

              {/* 🔘 Checkbox para escribir otra raza */}
              <Form.Check
                type="checkbox"
                id="otro"
                label="Otro"
                className="mt-2"
                checked={isOther}
                onChange={(e) => {
                  setIsOther(e.target.checked);
                  if (!e.target.checked) setCustomRaza("");
                }}
              />

              {/* Campo visible solo si marca "Otro" */}
              {isOther && (
                <Form.Control
                  type="text"
                  placeholder="Escribe la raza..."
                  className="mt-2"
                  value={customRaza}
                  onChange={(e) => setCustomRaza(e.target.value)}
                  required
                />
              )}
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                {existingPet ? "Guardar Cambios" : "Agregar"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
