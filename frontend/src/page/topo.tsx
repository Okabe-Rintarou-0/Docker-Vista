import BasicLayout from "../components/layout";
import TopographyCanvas from "../components/topography";
import { useTopography } from "../service/container";

export function TopologicalPage() {
    const { topography, mutate } = useTopography()

    return <BasicLayout>
        {topography && <TopographyCanvas topo={topography} />}
    </BasicLayout>
}