import axios from "axios";
import { BASE_URL } from "./contants";
import { ContainerInfo, FileEntry, Topography } from "../lib/models";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useContainerInfoList() {
    const { data, isLoading, error, mutate } = useSWR<ContainerInfo[]>(`${BASE_URL}/api/containers/info`, fetcher);
    return {
        infoList: data,
        isLoading,
        mutate,
    }
}

export function useDirEntries(path: string) {
    const { data, isLoading, error, mutate } = useSWR<FileEntry[]>(`${BASE_URL}/api/layers/dir?path=` + path, fetcher);
    return {
        entries: data,
        isLoading,
        mutate,
    }
}

export function useTopography() {
    const { data, isLoading, error, mutate } = useSWR<Topography>(`${BASE_URL}/api/containers/topography`, fetcher);
    return {
        topography: data,
        isLoading,
        mutate,
    }
}