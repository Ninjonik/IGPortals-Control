import {NextApiRequest} from "next";
import {cpu, mem, netstat, os} from "node-os-utils";
import SystemStatsInterface from "@/app/interfaces/SystemStatsInterface";

const fetchData = async () => {

    const memoryInfo = await mem.info();
    const cpuInfo = await cpu.usage();
    const netInfo = await netstat.stats();

    return {
        memoryInfo,
        cpuInfo,
        netInfo,
        hostname: os.hostname(),
        type: os.type(),
        ip: os.ip(),
        platform: os.platform(),
        uptime: Math.round(os.uptime() / 60 / 60),
    };
}

export async function GET(req: NextApiRequest, res: Response) {
    try {
        const data = await fetchData();

        if (data) {
            return Response.json(data)
        } else {
            return Response.json({ error: 'Data not found' }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
