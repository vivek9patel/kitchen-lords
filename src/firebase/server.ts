import { Chef, Day, Kitchens, Week } from "./types";

export const fetchChefById = async (id: string): Promise<Chef> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef?id=${id}`);
    return response.json();
}

export const fetchChefByEmail = async (email: string): Promise<Chef> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef?email=${email}`);
    return response.json();
}

export const fetchChefKitchens = async (email: string): Promise<Kitchens> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef/kitchens?email=${email}`);
    return response.json();
}

export const fetchIfAuthorized = async (email: string): Promise<{isAuthorized: boolean}> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chef/authorized?email=${email}`);
    console.log("fetchIfAuthorized", response);
    return await response.json();
}

export const fetchKitchenName = async (id: string): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/name?id=${id}`);
    return response.text();
}

export const fetchKitchenWeek = async (id: string): Promise<Week> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/week?id=${id}`);
    return response.json();
}

export const fetchKitchenDay = async (id: string, day: string): Promise<Day> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/day?id=${id}&day=${day}`);
    return response.json();
}

export const fetchKitchenImage = async (id: string): Promise<string> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/image?id=${id}`);
    return response.text();
}