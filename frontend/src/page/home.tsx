import ContainerCard from "../components/container_card";
import BasicLayout from "../components/layout";
import { useContainerInfoList } from "../service/container";

export default function HomePage() {
    let { infoList, mutate } = useContainerInfoList();
    return <BasicLayout>{infoList?.map(info =>
        <ContainerCard info={info} key={info.id} />)}
    </BasicLayout>
}