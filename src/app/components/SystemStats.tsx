"use client"

import React, { useState, useEffect } from 'react';
import SystemStatsInterface from "@/app/interfaces/SystemStatsInterface";

export default function SystemStats() {
    const [systemStats, setSystemStats] = useState<SystemStatsInterface>({
        memoryInfo: {
            totalMemMb: 0,
            usedMemMb: 0,
            freeMemMb: 0,
            usedMemPercentage: 0,
            freeMemPercentage: 0,
        },
        cpuInfo: 0,
        netInfo: [],
        hostname: '',
        type: '',
        ip: '',
        platform: '',
        uptime: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/system-stats');
                const data: SystemStatsInterface = await response.json();
                setSystemStats(data);
                // Calculate total input and output bytes
                if(systemStats.netInfo !== "not supported"){
                    setTotalInputBytes(systemStats.netInfo.reduce((acc, curr) => acc + curr.inputBytes, 0));
                    setTotalOutputBytes(systemStats.netInfo.reduce((acc, curr) => acc + curr.outputBytes, 0));
                }
            } catch (error) {
                console.error('Failed to fetch system stats:', error);
            }
        };

        // Fetch data immediately
        fetchData();

        // Set up interval to fetch data every second
        const intervalId = setInterval(fetchData, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const [totalInputBytes, setTotalInputBytes] = useState(0);
    const [totalOutputBytes, setTotalOutputBytes] = useState(0);

    return (
        <div className="row-span-1 col-span-2 grid gap-4 grid-cols-3 grid-rows-2">
            <div
                className='row-span-1 col-span-2 bg-base-100 rounded-lg flex flex-col justify-center items-center text-center p-4'>
                <span>{systemStats.hostname} - {systemStats.type}</span>
                <span>{systemStats.ip} - {systemStats.platform}</span>
                <span>Uptime: {systemStats.uptime} hours</span>
            </div>
            <div
                className='row-span-2 col-span-1 bg-base-100 rounded-lg flex justify-center items-center text-center p-2'>
                <div className="flex flex-col justify-center h-full items-center">
                    <span>IN: {totalInputBytes} bytes</span>
                    <span>OUT: {totalOutputBytes} bytes</span>
                </div>
            </div>
            <div
                className='row-span-1 col-span-1 bg-base-100 rounded-lg flex justify-center items-center text-center p-2'>
                <div className="flex flex-col justify-center h-full items-center">
                    <span>RAM: {Math.round(systemStats.memoryInfo.usedMemMb)}/{Math.round(systemStats.memoryInfo.totalMemMb)} MB</span>
                    <span>CPU: {Math.round(systemStats.cpuInfo)}%</span>
                </div>
            </div>
            <div
                className='row-span-1 col-span-1 bg-base-100 rounded-lg flex justify-center items-center text-center p-2'>
                <div className="flex flex-col justify-center h-full items-center">
                    <span>IN: {totalInputBytes} bytes</span>
                    <span>OUT: {totalOutputBytes} bytes</span>
                </div>
            </div>
        </div>
    );
};
