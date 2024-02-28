'use client'
import React, { useEffect, useState } from 'react';
import { Chef } from '@/firebase/types';
import { fetchKitchenChefs } from '@/firebase/server';

type IChefsContext = {
    loading: boolean;
    kitchenChefs: Chef[];
    setKitchenId: (kitchenId: string) => void;
};

export const ChefsContext = React.createContext<IChefsContext>({loading: false, kitchenChefs: [], setKitchenId: () => {}});

export default function ChefsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [kitchenChefs, setKitchenChefs] = useState<{loading: boolean, kitchenChefs: Chef[]}>({loading: false, kitchenChefs: []});
    const [kitchenId, setKitchenId] = useState<string | null>(null);
    useEffect(() => {
        setKitchenChefs({loading: true, kitchenChefs: []});
        if(kitchenId){
            fetchKitchenChefs(kitchenId).then((chefs) => {
                setKitchenChefs({loading: false, kitchenChefs: chefs});
            }).catch((error) => {
                setKitchenChefs({loading: false, kitchenChefs: []});
            })
        }
    }, [kitchenId]);

    return (
        <ChefsContext.Provider value={{loading: kitchenChefs.loading, kitchenChefs: kitchenChefs.kitchenChefs, setKitchenId}}>
            {children}
        </ChefsContext.Provider>
    );
}