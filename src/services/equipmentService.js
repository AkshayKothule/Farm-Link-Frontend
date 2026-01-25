import api from "./api";

// ================= OWNER EQUIPMENTS =================

// GET my equipments (OWNER)
export const getMyEquipments = () => {
  return api.get("/equipments/my");
};

// ADD equipment (OWNER)
export const addEquipment = (payload) => {
  return api.post("/equipments", payload);
};

// UPDATE equipment (OWNER)
export const updateEquipment = (id, payload) => {
  return api.put(`/equipments/${id}`, payload);
};

// DELETE equipment (OWNER)
export const deleteEquipment = (id) => {
  return api.delete(`/equipments/${id}`);
};

