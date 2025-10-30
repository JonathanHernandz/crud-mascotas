import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../context/PetContext";
import { toast } from "react-toastify";
import { Button, Card, Table, Pagination, Form, InputGroup } from "react-bootstrap";
import { PencilSquare, Trash, Search } from "react-bootstrap-icons"; // ✅ Lupa agregada
import addPetIcon from "../assets/add-pet.svg";

export default function PetTable() {
  const { pets, deletePet } = useContext(PetContext);
  const navigate = useNavigate();

  // 🔹 Búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Ordenamiento
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // ✅ Filtrado general (nombre, edad, raza)
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const term = searchTerm.toLowerCase();
      return (
        pet.nombre.toLowerCase().includes(term) ||
        pet.raza.toLowerCase().includes(term) ||
        String(pet.edad).includes(term)
      );
    });
  }, [pets, searchTerm]);

  // ✅ Ordenar correctamente
  const sortedPets = [...filteredPets].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;

    let valA = a[key];
    let valB = b[key];

    if (key === "edad") {
      valA = Number(valA);
      valB = Number(valB);
    }

    if (typeof valA === "string") {
      return sortConfig.direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortConfig.direction === "asc" ? valA - valB : valB - valA;
    }
  });

  // 🔹 Paginación
  const totalPages = Math.ceil(sortedPets.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPets = sortedPets.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
      deletePet(id);
      toast.success("Mascota eliminada con éxito");
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <>
      <Card className="shadow-sm p-4 mt-4">
        <Card.Body>
          {/* 🔍 Buscador en la parte superior */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <Card.Title className="fw-bold mb-2">Lista de Mascotas</Card.Title>

            <InputGroup style={{ maxWidth: "300px" }}>
              <InputGroup.Text className="bg-white border-end-0">
                <Search size={18} color="#0d6efd" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar nombre, edad o raza..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-start-0"
              />
            </InputGroup>
          </div>

          <div className="text-muted small mb-2">
            Mostrando {filteredPets.length === 0 ? 0 : indexOfFirst + 1}–
            {Math.min(indexOfLast, filteredPets.length)} de {filteredPets.length}
          </div>

          <Table striped bordered hover responsive className="mt-2 text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th onClick={() => handleSort("nombre")} style={{ cursor: "pointer", userSelect: "none" }}>
                  <span className="d-flex justify-content-center align-items-center gap-1">
                    Nombre <span>{getSortIcon("nombre")}</span>
                  </span>
                </th>
                <th onClick={() => handleSort("edad")} style={{ cursor: "pointer", userSelect: "none" }}>
                  <span className="d-flex justify-content-center align-items-center gap-1">
                    Edad <span>{getSortIcon("edad")}</span>
                  </span>
                </th>
                <th onClick={() => handleSort("raza")} style={{ cursor: "pointer", userSelect: "none" }}>
                  <span className="d-flex justify-content-center align-items-center gap-1">
                    Raza <span>{getSortIcon("raza")}</span>
                  </span>
                </th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>

            <tbody>
              {currentPets.length === 0 ? (
                <tr>
                  <td colSpan={5} align="center">
                    No se encontraron mascotas
                  </td>
                </tr>
              ) : (
                currentPets.map((pet) => (
                  <tr key={pet.id}>
                    <td>{pet.nombre}</td>
                    <td>{pet.edad}</td>
                    <td>{pet.raza}</td>
                    <td>
                      <Button
                        variant="btn-icon btn-icon-primary"
                        onClick={() => navigate(`/edit/${pet.id}`)}
                      >
                        <PencilSquare size={25} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="btn-icon btn-icon-danger"
                        onClick={() => handleDelete(pet.id)}
                      >
                        <Trash size={25} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* 🔹 Paginación */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* 🔹 Botón flotante para agregar */}
      <button
        onClick={() => navigate("/add")}
        className="fab-icon-button shadow-lg"
        aria-label="Agregar mascota"
      >
        <img src={addPetIcon} alt="Agregar Mascota" className="fab-icon" />
      </button>
    </>
  );
}
