import {db} from '../index';
import { ref, update, Database, onValue, get, set } from "firebase/database";
import { DishType, Reaction, Kitchen } from '../types';
import {DEFAULT_KITCHEN_SCHEMA} from "../constants";

export default class KitchenDB{
    kitchenID: string;
    db: Database;
    root: string;

    constructor(kitchenID: string){
        this.db = db;
        this.kitchenID = kitchenID;
        this.root = `kitchen/${kitchenID}`;
    }

    // get methods
    public async getKitchenName(){
        const snapshot = await get(ref(this.db,`${this.root}/name`));
        return snapshot.val();
    }

    public async onAssigneeChange(day: string, callback: (chef_id: string) => void){
        onValue(ref(this.db,`${this.root}/week/${day}/chef_id`), (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }

    public async onReactionChange(day: string, callback: (reactions: {[chef_id: string]: Reaction}) => void){
        onValue(ref(this.db,`${this.root}/week/${day}/reactions`), (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }

    public async onCommentChange(day: string, callback: (comments: {[chef_id: string]: string}) => void){
        onValue(ref(this.db,`${this.root}/week/${day}/comments`), (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }

    public async onDishNameChange(day: string, callback: (dish_name: string) => void){
        onValue(ref(this.db,`${this.root}/week/${day}/dish_name`), (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }

    public async onDishStyleChange(day: string, callback: (dish_style: DishType) => void){
        onValue(ref(this.db,`${this.root}/week/${day}/dish_style`), (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }

    // update methods
    public async updateKitchenName(name: string){
        await update(ref(this.db,`${this.root}`), {name: name});
    }

    public async updateAssignee(day: string, chef_id: string){
        await update(ref(this.db,`${this.root}/week/${day}`), {chef_id: chef_id});
    }

    public async updateReaction(day: string, chef_id: string, reaction: Reaction){
        await update(ref(this.db,`${this.root}/week/${day}/reactions`), {[chef_id]: reaction});
    }

    public async updateComment(day: string, chef_id: string, comment: string){
        await update(ref(this.db,`${this.root}/week/${day}/comments`), {[chef_id]: comment});
    }

    public async updateDishName(day: string, dish_name: string){
        await update(ref(this.db,`${this.root}/week/${day}`), {dish_name: dish_name});
    }

    public async updateDishStyle(day: string, dish_style: DishType){
        await update(ref(this.db,`${this.root}/week/${day}`), {dish_style: dish_style});
    }

    // delete methods
    public async removeAssignee(day: string){
        await update(ref(this.db,`${this.root}/week/${day}`), {chef_id: null});
    }

    public async removeReaction(day: string, chef_id: string){
        await update(ref(this.db,`${this.root}/week/${day}/reactions`), {[chef_id]: null});
    }

    public async removeComment(day: string, chef_id: string){
        await update(ref(this.db,`${this.root}/week/${day}/comments`), {[chef_id]: null});
    }

    public async removeDish(day: string){
        await update(ref(this.db,`${this.root}/week/${day}`), {dish_name: null, dish_style: null, chef_id: null});
    }
}

export async function createKitchen(kitchenID: string, kitchenName: string){
    const kitchenRef = ref(db, `kitchen/${kitchenID}`);
    const kitchenData: Kitchen = {
        ...DEFAULT_KITCHEN_SCHEMA,
        name: kitchenName
    }
    await set(kitchenRef, kitchenData);
    return new KitchenDB(kitchenID);
  }