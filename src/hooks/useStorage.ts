import { useEffect, useState } from "react";
import {Drivers, Storage } from "@ionic/storage";
import { Incidence, IncidenceForm } from "../models/IncidenceModel";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver' 

const POLICE_KEY = "POLICE";

const getFormattedDate = (): string => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve el mes (0-11), por lo que sumamos 1
    const day = String(date.getDate()).padStart(2, '0'); // getDate() devuelve el día del mes (1-31)
    const year = String(date.getFullYear()).slice(-2); // getFullYear() devuelve el año completo (por ejemplo, 2024), por lo que tomamos los últimos 2 dígitos
  
    return `${month}/${day}/${year}`;
  };

export function useStorage(){
    const [store, setStore] = useState<Storage>();
    const [incidences, setIncidences] = useState<Incidence[]>([]);

    const initStorage = async() =>{
        const newStore = new Storage({
            name:'policeDb',
            driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await newStore.defineDriver(CordovaSQLiteDriver)
        const store = await newStore.create();
        setStore(store);

        const storedIncidences = await store.get(POLICE_KEY) || [];
        setIncidences(storedIncidences);
    }
    useEffect(()=>{
        
        initStorage();
    },[])

    const createIncidence = async(incidence: IncidenceForm) =>{
        
        const newIncidence:Incidence = {
            title:incidence.title,
            date: getFormattedDate(),
            photo: incidence.photo,
            description: incidence.description,
            audio: incidence.audio,
            id:''+new Date().getTime(),
        }

        const updatedIncidences =[...incidences, newIncidence] ; 
        setIncidences(updatedIncidences);
        store?.set(POLICE_KEY, updatedIncidences)
    }

    const deleteIncidences = async()=>{
        const deleted:Incidence[] = [];
        setIncidences(deleted);
        store?.set(POLICE_KEY, deleted)
    };

    return{
        incidences,
        setIncidences,
        createIncidence,
        initStorage,
        deleteIncidences
    }
}