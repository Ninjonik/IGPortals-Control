"use client"

import {useEffect, useState} from "react";

export const CurrentTime = () => {

    const [time, setTime] = useState<string>();
    const [date, setDate] = useState<string>();

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            setDate(currentDate.toLocaleDateString());
            const currentTime = new Date();
            setTime(currentTime.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span>{date} {time}</span>
    );
};