import { config } from 'dotenv';

export default function GetDotenvVariable(name: string): string | undefined {

    config();


    
    return process.env[name];
}