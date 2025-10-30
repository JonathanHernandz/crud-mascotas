import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { PetContext } from "../context/PetContext";
import breedsData from "../data/breeds.json";
import backIcon from "../assets/back.svg"; // ✅ Tu ícono SVG de retroceso

export default function PetForm() {
  const { pets, addPet, editPet } = useContext(PetContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const existingPet = id ? pets.find((p) => p.id === Number(id)) : null;

  const [pet, setPet] = useState(
    existingPet || { nombre: "", edad: "", raza: "" }
  );

  const [isOther, setIsOther] = useState(false);
  const [customRaza, setCustomRaza] = useState("");
  const sortedBreeds = [...breedsData].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (existingPet) {
      setPet(existingPet);
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

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(pet.nombre.trim())) {
      toast.error("El nombre solo debe contener letras.");
      return;
    }

    if (pet.nombre.length > 30) {
      toast.error("El nombre no puede tener más de 30 caracteres.");
      return;
    }

    if (isNaN(pet.edad) || pet.edad < 1 || pet.edad > 100) {
      toast.error("La edad debe estar entre 1 y 100 años.");
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
          {/* 🔙 Botón Back (ahora visible tanto en editar como en agregar) */}
          <img
            src={backIcon}
            alt="Volver"
            title="Volver"
            onClick={() => navigate("/")}
            style={{
              width: "60px",
              height: "60px",
              cursor: "pointer",
              marginBottom: "8px",
              opacity: 0.8,
              transition: "opacity 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          />

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
                maxLength={30}
                onChange={(e) => setPet({ ...pet, nombre: e.target.value })}
                placeholder="Nombre de la Mascota"
                required
              />
              <small className="text-muted">{pet.nombre.length}/30 caracteres</small>
            </Form.Group>

            {/* 🎂 Edad */}
            <Form.Group className="mb-3">
              <Form.Label>Edad (años)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="100"
                step="1"
                value={pet.edad}
                onChange={(e) => setPet({ ...pet, edad: e.target.value })}
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
