
import { UserData } from "./user.interface";
export interface FactureData
{
  id:number;
  value:number;
  date:string;
  user:UserData;
}
