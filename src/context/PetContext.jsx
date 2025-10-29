import { createContext, useEffect, useState } from "react";

export const PetContext = createContext();


export const PetProvider  = ({ children }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("pets");
        if (stored) setPets(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("pets", JSON.stringify(pets));
    }, [pets]);

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
