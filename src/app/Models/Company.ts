import { Parking } from "./Parking"
import { User } from "./User"

export class Company
{
    id!:number
    name!:string
    country!:number
    users!:Array<User>
    parkings!:Array<Parking>
}
