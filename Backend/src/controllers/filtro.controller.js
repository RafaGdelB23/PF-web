import {
  getFiltroById,
  createNewFiltro,
  updateExistingFiltro,
  deleteFiltro,
  getAllFiltros,
  searchOffers
} from "../services/filtro.service.js";
import {
  FilterNotFoundError,
  FilterAlreadyExistsError,
  FiltroDeleteError,
  FiltersNotAvailable,
} from "../errors/errors.filtro.js";


const normalizeString = (str) => {
  return str
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase(); 
};


export const findFiltroById = async (req, res) => {
  try {
    const { id } = req.params;
    const filtro = await getFiltroById(id);
    res.status(200).json(filtro);
  } catch (error) {
    if (error instanceof FilterNotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al obtener el filtro" });
    }
  }
};


export const createFiltro = async (req, res) => {
  try {
    const filtroData = req.body;
    const newFiltro = await createNewFiltro(filtroData);
    res.status(201).json(newFiltro);
  } catch (error) {
    if (error instanceof FilterAlreadyExistsError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al crear el filtro" });
    }
  }
};


export const updateFiltro = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedFiltro = await updateExistingFiltro(id, updates);
    res.status(200).json(updatedFiltro);
  } catch (error) {
    if (error instanceof FilterNotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al actualizar el filtro" });
    }
  }
};


export const removeFiltro = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFiltro = await deleteFiltro(id);
    res.status(200).json({ message: "Filtro eliminado exitosamente", filtro: deletedFiltro });
  } catch (error) {
    if (error instanceof FiltroDeleteError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof FilterNotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al eliminar el filtro" });
    }
  }
};


export const findAllFiltros = async (req, res) => {
  try {
    const filtros = await getAllFiltros();
    res.status(200).json(filtros);
  } catch (error) {
    if (error instanceof FiltersNotAvailable) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al obtener los filtros" });
    }
  }
};


export const searchFilters = async (req, res) => {
  const { presupuesto, dias, comida, actividades, intereses } = req.query;

  try {
   
    const filterConditions = {};

    
    if (presupuesto) {
      filterConditions.budget = { $lte: presupuesto };
    }

    
    if (dias) {
      filterConditions.days = { $lte: dias };
    }

   
    if (comida) {
      const comidaArray = comida.split(",").map(item => normalizeString(item.trim())); 
      filterConditions.food = { $in: comidaArray };
    }

    
    if (actividades) {
      const actividadesArray = actividades.split(",").map(item => normalizeString(item.trim())); 
      filterConditions.activities = { $in: actividadesArray };
    }

    
    if (intereses) {
      const interesesArray = intereses.split(",").map(item => normalizeString(item.trim())); 
      filterConditions.interests = { $in: interesesArray };
    }

    
    const ofertas = await searchOffers(filterConditions);

    if (ofertas.length === 0) {
      return res.status(404).json({ message: "No se encontraron ofertas." });
    }

    return res.status(200).json(ofertas);

  } catch (error) {
    console.error("Error al obtener ofertas filtradas:", error);
    return res.status(500).json({ message: "Error al obtener ofertas filtradas." });
  }
};
