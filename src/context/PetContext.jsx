import { createContext, useEffect, useState } from "react";

export const PetContext = createContext();


export const PetProvider  = ({ children }) => {
    const [pets, setPets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("pets");
        if (stored) {
            try {
                setPets(JSON.parse(stored));
            } catch (error) {
                console.error("Error al leer mascotas guardadas:", error);
                setPets([]);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("pets", JSON.stringify(pets));
        }
    }, [pets, isLoaded]);

    const addPet = (pet) => { setPets([...pets,{...pet,id: Date.now()}]) };
    const deletePet = (id) => { setPets(pets.filter(pet => pet.id !== id)) };
    const editPet = (id, updatedPet) => {
        setPets(pets.map(pet => (pet.id === id ? { ...pet, ...updatedPet } : pet)));
    };

    return (
        <PetContext.Provider value={{ pets, setPets, addPet, deletePet, editPet }}>
            {children}
        </PetContext.Provider>
    );
};
