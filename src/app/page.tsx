"use client"

import { useEffect, useState } from 'react';

export default function Home() {
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    const [nameDay, setNameDay] = useState<string>("");

    useEffect(() => {
        const currentDate = new Date();
        setDate(currentDate.toLocaleDateString());
        const currentTime = new Date();
        setTime(currentTime.toLocaleTimeString());

        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const country = data.country;

                const url = new URL("https://nameday.abalin.net/api/V1/today");
                const params = {
                    "country": country.toLowerCase(),
                };
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                const headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                };

                fetch(url, {
                    method: "GET",
                    headers,
                })
                    .then(response => response.json())
                    .then(data => {
                        setNameDay(data.nameday[country.toLowerCase()]);
                    });
            });
    }, []);

    return (
        <main className="flex h-full flex-col items-center justify-between p-24 bg-cover bg-no-repeat bg-opacity-75 bg-[url('https://static.vecteezy.com/system/resources/previews/021/739/427/original/simple-and-cool-3d-abstract-background-design-suitable-for-pc-backgrounds-and-others-vector.jpg')]">
            <div className="grid grid-rows-3 grid-cols-5 w-full h-full gap-4">
                <div className="row-span-1 col-span-3 bg-neutral p-8 rounded-lg">
                    <h1>Welcome to the IGPortals Dashboard.</h1>
                    <h3>Today is: {date} </h3>
                    <h3>Name day: {nameDay} </h3>
                    <h3>Current time is: {time} </h3>
                </div>
                <div className="row-span-1 col-span-1 bg-neutral p-8 rounded-lg">
                    <h2>Stats.</h2>
                    <h3>Name day: {nameDay} </h3>
                </div>
                <div className="row-span-1 col-span-1 grid gap-4 grid-cols-2 grid-rows-2">
                    <div className='row-span-1 col-span-1 bg-neutral rounded-lg flex justify-center items-center text-center'>
                        a
                    </div>
                    <div className='row-span-1 col-span-1 bg-neutral rounded-lg flex justify-center items-center text-center'>
                        b
                    </div>
                    <div className='row-span-1 col-span-2 bg-neutral rounded-lg flex justify-center items-center text-center'>
                        c
                    </div>
                </div>
            </div>
        </main>
    );
}