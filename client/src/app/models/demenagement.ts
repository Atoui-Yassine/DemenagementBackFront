import { Chauffeur } from "./Chauffeur";
import { Client } from "./Client";
import { Vehicle } from "./Vehicle";

export interface MovingReservation {
    id: number;
    date: string;
    startAddress: string;
    endAddress: string;
    client:Client;
    furnitureCategory: string; 
    status: string; 
    chauffeur:Chauffeur | null;
    camion:Vehicle | null ;
  }
  