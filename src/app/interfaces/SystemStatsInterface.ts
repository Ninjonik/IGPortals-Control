interface NetInfo {
    interface: string;
    inputBytes: number;
    outputBytes: number;
}

export default interface SystemStatsInterface {
    memoryInfo: {
        totalMemMb: number;
        usedMemMb: number;
        freeMemMb: number;
        usedMemPercentage: number;
        freeMemPercentage: number;
    };
    cpuInfo: number;
    netInfo: NetInfo[] | "not supported";
    hostname: string;
    type: string;
    ip: string;
    platform: string;
    uptime: number;
}
