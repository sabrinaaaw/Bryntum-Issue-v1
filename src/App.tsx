import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { schedulerproProps } from './SchedulerProConfig';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import {setData, updateData} from "./store/dataSlice";

interface Event {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    duration: number;
    durationUnit: string;
    iconCls: string;
    eventColor: string;
}

interface Resource {
    id: number;
    name: string;
    iconCls: string;
    image: boolean;
}


const App: FunctionComponent = () => {
    const schedulerpro = useRef<BryntumSchedulerPro>(null);
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const jsonData = await response.json();

                dispatch(setData({
                    events: jsonData.events,
                    resources: jsonData.resources,
                    assignments: jsonData.assignments || [],
                }));
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    const changeEventColor = () => {
        //@ts-ignore
        console.log('SyncDataOnLoad', schedulerpro?.current?.instance?.eventStore.configDone.syncDataOnLoad)
        const event = data.events.find(e => e.id === 1);
        if (event && event.eventColor === 'blue') {
            dispatch(updateData({ ...event, eventColor: 'green' }));
        }
    };

    return (
        <>
            <button onClick={changeEventColor}>Change Event 1 Color to Green</button>
            <BryntumSchedulerPro
                    ref={schedulerpro}
                    {...schedulerproProps}
                    events={data.events}
                    resources={data.resources}
            />
        </>
    );
};

export default App;