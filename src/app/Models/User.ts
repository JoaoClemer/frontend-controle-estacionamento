import { Company } from "./Company";

export class User
{
  id!:number;
  name!:string;
  username!:string;
  passwordHash!:string;
  role!:number;
  isActive!:boolean;
  companyId!:number;
}
