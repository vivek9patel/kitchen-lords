import {db} from '../index';
import { ref, update, Database, onValue, get, set } from "firebase/database";
import { DishType, Reaction, Kitchen } from '../types';

export default class Chef{
    chef_id: string;
    db: Database;
    root: string;
    // name: string;
    // is_god: boolean;
    
    constructor(chef_id: string){
        this.chef_id = chef_id;
        this.db = db;
        this.root = `chef/${chef_id}`;
        // this.name = this.getName();
        // this.is_god = this.getIsGod();
    }

    // get methods
    private async getName(){
        const snapshot = await get(ref(this.db,`${this.root}/name`));
        console.log("chef name", snapshot.val());
        return snapshot.val();
    }

    private async getIsGod(){
        const snapshot = await get(ref(this.db,`${this.root}/is_god`));
        return snapshot.val();
    }

    public async getKitchens(){
        const snapshot = await get(ref(this.db,`${this.root}/kitchens`));
        return snapshot.val();
    }

}

export async function createChef(chef_id: string){
    const chefRef = ref(db, `chef/${chef_id}`);
    await set(chefRef, {
        email: chef_id,
        name: chef_id,
        kitchens: {},
        is_god: false
    });
    return new Chef(chef_id);
}