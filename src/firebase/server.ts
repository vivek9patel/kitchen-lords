import Cookies from "js-cookie";
import { Chef, Day, Kitchens, Week } from "./types";

const getCookie = async (name: string) => {
    return Cookies.get(name) ?? '{}';
}

export const fetchChefById = async (id: string): Promise<Chef> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef?id=${id}`,{ cache: 'no-store' });
    return response.json();
}

export const fetchChefByEmail = async (email: string): Promise<Chef> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef?email=${email}`,{ cache: 'no-store' });
    return response.json();
}

export const fetchChefKitchens = async (email: string): Promise<Kitchens> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef/kitchens?email=${email}`,{ cache: 'no-store' });
    console.log("response", response.status, JSON.stringify(response) );
    return response.json();
}

export const fetchIfAuthorized = async (email: string): Promise<{isAuthorized: boolean}> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef/authorized?email=${email}`,{ cache: 'no-store' });
    console.log("response", response.status, response.statusText);
    return response.json();
}

export const fetchKitchenName = async (id: string): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/name?id=${id}`,{ cache: 'no-store' });
    return response.text();
}

export const fetchKitchenWeek = async (id: string): Promise<Week> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/week?id=${id}`,{ cache: 'no-store' });
    return response.json();
}

export const fetchKitchenDay = async (id: string, day: string): Promise<Day> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/day?id=${id}&day=${day}`,{ cache: 'no-store' });
    return response.json();
}

export const fetchKitchenImage = async (id: string): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/image?id=${id}`,{ cache: 'no-store' });
    return response.text();
}

export const fetchKitchenChefs = async (id: string): Promise<Chef[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/chefs?id=${id}`,{ cache: 'no-store' });
    return response.json();
}

export const updateKitchenDayDishAndAssignee = async (id: string, day: string, chef_id: string, dish_name: string, dish_type: string): Promise<any> => {
    const currentUser = JSON.parse(await getCookie('currentUser'));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/day/assign`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
        } ,
        body: JSON.stringify({
            uid: currentUser.email,
            id,
            day,
            chef_id,
            dish_name,
            dish_type
        })          
    });
    return response.json();
}

export const updateKitchenDayReaction = async (id: string, chef_id: string, day: string, reaction: string): Promise<any> => {
    const currentUser = JSON.parse(await getCookie('currentUser'));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/day/reaction`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
        } ,
        body: JSON.stringify({
            uid: currentUser.email,
            id,
            chef_id,
            day,
            reaction
        })          
    });
    return response.json();
}

export const deleteKitchenDayDishAndAssignee = async (id: string, day: string, chef_id: string): Promise<any> => {
    const currentUser = JSON.parse(await getCookie('currentUser'));
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/day/assign`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
        } ,
        body: JSON.stringify({
            uid: currentUser.email,
            id,
            day,
            chef_id
        })          
    });
    return response.json();
}

export const resetDaysInAllKitchens= async (uid: string, day: string): Promise<any> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchens/day/assignee`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
        } ,
        body: JSON.stringify({
            uid,
            day
        })          
    });
    return response.json();
}