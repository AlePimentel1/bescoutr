'use client'
import { getLeague } from "@/actions/leagues";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableCellLoader from "./table-cell-loader";
import TableHeaderLoader from "./header-loader";

export default function LeaguesTable() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const leagueIdFromUrl = searchParams.get('id');
    const initialLeagueId = leagueIdFromUrl ? parseInt(leagueIdFromUrl) : 39;

    const [selectedLeague, setSelectedLeague] = useState(initialLeagueId);

    useEffect(() => {
        if (!leagueIdFromUrl) {
            router.replace(`?id=39`)
        } else if (leagueIdFromUrl && parseInt(leagueIdFromUrl) !== selectedLeague) {
            setSelectedLeague(parseInt(leagueIdFromUrl))
        }
    }, [leagueIdFromUrl, router, selectedLeague])

    const { data, isLoading, isPending, isError } = useQuery({
        queryKey: ["league", selectedLeague],
        queryFn: () => getLeague(selectedLeague),
        enabled: !!selectedLeague,
    });

    return (
        // (isLoading || isPending) ? <p className="text-white">Loading...</p> : isError ? (
        //     <p className="text-white">Un error</p>
        // ) : data ? (
        <div className="flex flex-col gap-4 w-full h-fit p-4 text-white bg-white/5 rounded-xl">
            {isLoading ? (
                <TableHeaderLoader />
            ) : data.league ? (
                <div className="flex flex-row w-full justify-between items-center">
                    <p>{data.league.name}</p>
                    <span className="flex gap-2 items-center">
                        <img src={data.league.logo} alt={data.league.name} className="w-12 h-12" />
                        <p className="text-xl">{data.league.name}</p>
                    </span>
                    <p>{`Temporada ${data.league.season}`}</p>
                </div>
            ) : null}

            <Table className="rounded-xl">
                <TableHeader >
                    <TableRow className="bg-white/20 hover:bg-white/20 border-b-transparent">
                        <TableHead className="text-white rounded-l-xl">Equipo</TableHead>
                        <TableHead className="text-white text-center">Pts</TableHead>
                        <TableHead className="text-white text-center">PJ</TableHead>
                        <TableHead className="text-white text-center">G</TableHead>
                        <TableHead className="text-white text-center">E</TableHead>
                        <TableHead className="text-white text-center">P</TableHead>
                        <TableHead className="text-white text-center">GF</TableHead>
                        <TableHead className="text-white text-center">GC</TableHead>
                        <TableHead className="text-white text-center rounded-r-xl ">DG</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableCellLoader headers={["Equipo", "Pts", "PJ", "G", "E", "P", "GF", "GC", "DG"]} elements={20} />
                    ) : data.league.standings.length > 0 ? data.league.standings[0].map((teamData: any, index: number) => (
                        <TableRow key={teamData.team.id} className="hover:bg-tranpsarent border-b-white/20 cursor-default">
                            <TableCell className="flex items-center">
                                <span className="mr-4">{teamData.rank}</span>
                                <img
                                    src={teamData.team.logo}
                                    alt={teamData.team.name}
                                    className="w-6 h-6 mr-2 object-contain" // Ajusta el tamaño y usa `object-contain` para mantener la imagen en su proporción
                                />
                                <span>{teamData.team.name}</span>
                            </TableCell>
                            <TableCell className="text-center">{teamData.points}</TableCell>
                            <TableCell className="text-center">{teamData.all.played}</TableCell>
                            <TableCell className="text-center">{teamData.all.win}</TableCell>
                            <TableCell className="text-center">{teamData.all.draw}</TableCell>
                            <TableCell className="text-center">{teamData.all.lose}</TableCell>
                            <TableCell className="text-center">{teamData.all.goals.for}</TableCell>
                            <TableCell className="text-center">{teamData.all.goals.against}</TableCell>
                            <TableCell className="text-center">{teamData.goalsDiff}</TableCell>
                        </TableRow>
                    )) : (
                        'No hay datos'
                    )}
                </TableBody>
            </Table>
        </div>
        // ) : null
    );
}

