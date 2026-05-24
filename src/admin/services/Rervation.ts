import { API_CONFIG } from "../../config/config";
import type { 
    CreateReservationResponse,
    CreateReservation
}from "../Interfaces/Reservation.type";
import Cookies from "js-cookie";
/**
 * Función para crear una nueva reserva. Envía una solicitud POST al endpoint de creación de reservas con los datos necesarios.
 * @param request solicitud de creación de reserva que incluye el ID de la función y los IDs de los asientos seleccionados
 * @returns promesa con la respuesta de la creación de la reserva
 */
export async function CreateReservation(request: CreateReservation): Promise<CreateReservationResponse> {
    try{
        console.log("Creating reservation:", request);
        
        const body = {
            funtionId: request.FuntionId,
            seatIds: request.SeatIds
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESERVATION.CREATE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(body),
            credentials: "include"
        });
        
        return await response.json();

    }catch(error){
        console.error("Error creating reservation:", error);
        return {
            Success: false,
            Message: "Error de conexión",
            Data: null!
        }
        
    }
    
}
export async function GetSeats(funtionId: number) {
    try {
        console.log("Getting seats for function:", funtionId);
        
        const mockSeats = [


        { id: 1, seatNumber: "A1", section: "VIP Divine", price: 85000, status: 0 },
        { id: 2, seatNumber: "A2", section: "VIP Divine", price: 85000, status: 0 },
        { id: 3, seatNumber: "A3", section: "VIP Divine", price: 85000, status: 1 },
        { id: 4, seatNumber: "A4", section: "VIP Divine", price: 85000, status: 0 },
        { id: 5, seatNumber: "A5", section: "VIP Divine", price: 85000, status: 0 },
        { id: 6, seatNumber: "A6", section: "VIP Divine", price: 85000, status: 0 },
        { id: 7, seatNumber: "A7", section: "VIP Divine", price: 85000, status: 0 },
        { id: 8, seatNumber: "A8", section: "VIP Divine", price: 85000, status: 0 },

        // Fila B - 9 asientos
        { id: 9, seatNumber: "B1", section: "VIP Divine", price: 85000, status: 0 },
        { id: 10, seatNumber: "B2", section: "VIP Divine", price: 85000, status: 0 },
        { id: 11, seatNumber: "B3", section: "VIP Divine", price: 85000, status: 0 },
        { id: 12, seatNumber: "B4", section: "VIP Divine", price: 85000, status: 1 },
        { id: 13, seatNumber: "B5", section: "VIP Divine", price: 85000, status: 0 },
        { id: 14, seatNumber: "B6", section: "VIP Divine", price: 85000, status: 0 },
        { id: 15, seatNumber: "B7", section: "VIP Divine", price: 85000, status: 0 },
        { id: 16, seatNumber: "B8", section: "VIP Divine", price: 85000, status: 0 },
        { id: 17, seatNumber: "B9", section: "VIP Divine", price: 85000, status: 0 },

        // Fila C - 10 asientos
        { id: 18, seatNumber: "C1", section: "VIP Divine", price: 85000, status: 0 },
        { id: 19, seatNumber: "C2", section: "VIP Divine", price: 85000, status: 0 },
        { id: 20, seatNumber: "C3", section: "VIP Divine", price: 85000, status: 0 },
        { id: 21, seatNumber: "C4", section: "VIP Divine", price: 85000, status: 0 },
        { id: 22, seatNumber: "C5", section: "VIP Divine", price: 85000, status: 0 },
        { id: 23, seatNumber: "C6", section: "VIP Divine", price: 85000, status: 0 },
        { id: 24, seatNumber: "C7", section: "VIP Divine", price: 85000, status: 0 },
        { id: 25, seatNumber: "C8", section: "VIP Divine", price: 85000, status: 1 },
        { id: 26, seatNumber: "C9", section: "VIP Divine", price: 85000, status: 0 },
        { id: 27, seatNumber: "C10", section: "VIP Divine", price: 85000, status: 0 },

        // Fila D - 11 asientos
        { id: 28, seatNumber: "D1", section: "VIP Divine", price: 85000, status: 0 },
        { id: 29, seatNumber: "D2", section: "VIP Divine", price: 85000, status: 0 },
        { id: 30, seatNumber: "D3", section: "VIP Divine", price: 85000, status: 0 },
        { id: 31, seatNumber: "D4", section: "VIP Divine", price: 85000, status: 0 },
        { id: 32, seatNumber: "D5", section: "VIP Divine", price: 85000, status: 0 },
        { id: 33, seatNumber: "D6", section: "VIP Divine", price: 85000, status: 0 },
        { id: 34, seatNumber: "D7", section: "VIP Divine", price: 85000, status: 0 },
        { id: 35, seatNumber: "D8", section: "VIP Divine", price: 85000, status: 0 },
        { id: 36, seatNumber: "D9", section: "VIP Divine", price: 85000, status: 1 },
        { id: 37, seatNumber: "D10", section: "VIP Divine", price: 85000, status: 0 },
        { id: 38, seatNumber: "D11", section: "VIP Divine", price: 85000, status: 0 },

        // Fila E - 12 asientos
        { id: 39, seatNumber: "E1", section: "VIP Divine", price: 85000, status: 0 },
        { id: 40, seatNumber: "E2", section: "VIP Divine", price: 85000, status: 0 },
        { id: 41, seatNumber: "E3", section: "VIP Divine", price: 85000, status: 0 },
        { id: 42, seatNumber: "E4", section: "VIP Divine", price: 85000, status: 0 },
        { id: 43, seatNumber: "E5", section: "VIP Divine", price: 85000, status: 0 },
        { id: 44, seatNumber: "E6", section: "VIP Divine", price: 85000, status: 0 },
        { id: 45, seatNumber: "E7", section: "VIP Divine", price: 85000, status: 0 },
        { id: 46, seatNumber: "E8", section: "VIP Divine", price: 85000, status: 0 },
        { id: 47, seatNumber: "E9", section: "VIP Divine", price: 85000, status: 0 },
        { id: 48, seatNumber: "E10", section: "VIP Divine", price: 85000, status: 0 },
        { id: 49, seatNumber: "E11", section: "VIP Divine", price: 85000, status: 1 },
        { id: 50, seatNumber: "E12", section: "VIP Divine", price: 85000, status: 0 },

        // ========== PLATEA (F-K) ==========
        // Fila F - 13 asientos
        ...Array.from({ length: 13 }, (_, i) => ({ 
            id: 51 + i, 
            seatNumber: `F${i + 1}`, 
            section: "Platea", 
            price: 45000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila G - 14 asientos
        ...Array.from({ length: 14 }, (_, i) => ({ 
            id: 64 + i, 
            seatNumber: `G${i + 1}`, 
            section: "Platea", 
            price: 45000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila H - 15 asientos
        ...Array.from({ length: 15 }, (_, i) => ({ 
            id: 78 + i, 
            seatNumber: `H${i + 1}`, 
            section: "Platea", 
            price: 45000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila I - 16 asientos
        ...Array.from({ length: 16 }, (_, i) => ({ 
            id: 93 + i, 
            seatNumber: `I${i + 1}`, 
            section: "Platea", 
            price: 45000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila J - 17 asientos
        ...Array.from({ length: 17 }, (_, i) => ({ 
            id: 109 + i, 
            seatNumber: `J${i + 1}`, 
            section: "Platea", 
            price: 45000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila K - 18 asientos
        ...Array.from({ length: 18 }, (_, i) => ({ 
            id: 126 + i, 
            seatNumber: `K${i + 1}`, 
            section: "Platea", 
            price: 45000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // ========== ANFITEATRO (L-Q, aumenta de 2 en 2) ==========
        // Fila L - 16 asientos
        ...Array.from({ length: 16 }, (_, i) => ({ 
            id: 144 + i, 
            seatNumber: `L${i + 1}`, 
            section: "Anfiteatro", 
            price: 28000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila M - 18 asientos
        ...Array.from({ length: 18 }, (_, i) => ({ 
            id: 160 + i, 
            seatNumber: `M${i + 1}`, 
            section: "Anfiteatro", 
            price: 28000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila N - 20 asientos
        ...Array.from({ length: 20 }, (_, i) => ({ 
            id: 178 + i, 
            seatNumber: `N${i + 1}`, 
            section: "Anfiteatro", 
            price: 28000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila O - 22 asientos
        ...Array.from({ length: 22 }, (_, i) => ({ 
            id: 198 + i, 
            seatNumber: `O${i + 1}`, 
            section: "Anfiteatro", 
            price: 28000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila P - 24 asientos
        ...Array.from({ length: 24 }, (_, i) => ({ 
            id: 220 + i, 
            seatNumber: `P${i + 1}`, 
            section: "Anfiteatro", 
            price: 28000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila Q - 26 asientos
        ...Array.from({ length: 26 }, (_, i) => ({ 
            id: 244 + i, 
            seatNumber: `Q${i + 1}`, 
            section: "Anfiteatro", 
            price: 28000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // ========== GALERÍA (R-T) ==========
        // Fila R - 26 asientos
        ...Array.from({ length: 26 }, (_, i) => ({ 
            id: 270 + i, 
            seatNumber: `R${i + 1}`, 
            section: "Galería", 
            price: 18000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila S - 28 asientos
        ...Array.from({ length: 28 }, (_, i) => ({ 
            id: 296 + i, 
            seatNumber: `S${i + 1}`, 
            section: "Galería", 
            price: 18000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // Fila T - 30 asientos
        ...Array.from({ length: 30 }, (_, i) => ({ 
            id: 324 + i, 
            seatNumber: `T${i + 1}`, 
            section: "Galería", 
            price: 18000, 
            status: Math.random() > 0.8 ? 1 : 0 
        })),

        // ========== PALCO IZQUIERDO (A-H, 5 asientos cada uno) ==========
        ...Array.from({ length: 8 }, (_, fila) => 
            Array.from({ length: 5 }, (_, i) => ({
            id: 354 + fila * 5 + i,
            seatNumber: `IzqF${String.fromCharCode(65 + fila)}${i + 1}`,
            section: "Palco Izquierdo",
            price: 65000,
            status: Math.random() > 0.8 ? 1 : 0
            }))
        ).flat(),

        // ========== PALCO DERECHO (A-H, 5 asientos cada uno) ==========
        ...Array.from({ length: 8 }, (_, fila) => 
            Array.from({ length: 5 }, (_, i) => ({
            id: 394 + fila * 5 + i,
            seatNumber: `DerF${String.fromCharCode(65 + fila)}${i + 1}`,
            section: "Palco Derecho",
            price: 65000,
            status: Math.random() > 0.8 ? 1 : 0
            }))
        ).flat(),
        ];
        return {
        success: true,
        message: "Asientos obtenidos correctamente",
        data: mockSeats
        };
    } catch (error) {
        console.error("Error getting seats:", error);
        return {
        success: false,
        message: "Error al obtener asientos",
        data: []
        };
    }
}