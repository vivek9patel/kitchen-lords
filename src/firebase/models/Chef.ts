import {db} from '../index';
import { ref, Database, get, set } from "firebase/database";
import { Kitchens } from '../types';

export default class Chef{
    chef_id: string;
    private db: Database;
    private root: string;
    
    constructor(chef_id: string){
        this.chef_id = chef_id;
        this.db = db;
        this.root = `chef/${chef_id}`;
    }

    public async getName(): Promise<string>{
        const snapshot = await get(ref(this.db,`${this.root}/name`));
        return snapshot.val();
    }

    public async getIsGod(): Promise<boolean>{
        const snapshot = await get(ref(this.db,`${this.root}/is_god`));
        return snapshot.val();
    }

    public async getKitchens(): Promise<Kitchens>{
        const snapshot = await get(ref(this.db,`${this.root}/kitchens`));
        return snapshot.val();
    }

}

export async function createChef(chef_id: string, chef_name: string){
    const chefRef = ref(db, `chef/${chef_id}`);
    await set(chefRef, {
        email: chef_id,
        name: chef_name,
        kitchens: {},
        is_god: false
    });
    return new Chef(chef_id);
}