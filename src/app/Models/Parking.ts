import { Vehicle } from "./Vehicle"

export class Parking
{
    id!:number
    TotalParkingSpots!:number
    vehicles!:Array<Vehicle>
    companyId!:number
}
