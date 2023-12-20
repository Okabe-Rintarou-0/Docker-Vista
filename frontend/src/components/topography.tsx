import G6 from "@antv/g6";
import { createRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Topography } from "../lib/models";
import { Rect, Group, Text, createNodeFromReact, appenAutoShapeListener } from "@antv/g6-react-node"

const CardNode = ({ cfg }: any) => {
    const { id, isRoot = false } = cfg;

    return (
        <Group draggable>
            <Rect
                style={{
                    display: "flex",
                    width: 500,
                    height: 'auto',
                    fill: '#fff',
                    stroke: '#ddd',
                    shadowColor: '#eee',
                    shadowBlur: 30,
                    radius: [8],
                    justifyContent: 'center',
                    padding: [18, 0],
                }}
                draggable
            >
                <Text
                    style={{
                        fill: '#000',
                        margin: [0, 24],
                        fontSize: "16px",
                        fontWeight: 'bold',
                    }}
                >
                    {isRoot ? 'Container' : 'Layer'}
                </Text>
                <Text style={{ fill: '#ccc', fontSize: "12px", margin: [12, 24] }}>
                    {id}
                </Text>
            </Rect>
        </Group>
    );
};

G6.registerNode("rect-xml", createNodeFromReact(CardNode));

export default function TopographyCanvas({ topo }: { topo: Topography }) {
    const [graph, setGraph] = useState<any>(undefined);
    const converToGraphData = () => {
        const nodes = topo.nodes.map(node => ({
            label: node.id,
            ...node
        }));
        const edges = topo.edges.map(e => ({
            source: e.src,
            target: e.tgt,
        }));
        return { nodes, edges };
    }

    const ref = createRef<HTMLDivElement>();

    const changeSize = () => {
        const container = ref.current;
        if (container && graph) {
            graph.changeSize(container.clientWidth, container.clientHeight);
        }
    }

    useEffect(() => {
        let g = graph;
        if (!g) {
            g = constructGraph();
            setGraph(g);
        }
        g.clear();
        g.data(converToGraphData())
        g.render();
    }, [topo]);

    const graphOpt = {
        fitView: false,
        modes: {
            default: [
                'drag-canvas',
                'zoom-canvas',
                'drag-node'
            ]
        },
        defaultNode: {
            type: 'rect-xml'
        },
        labelCfg: {
            style: {
                stroke: '#fff',
                lineWidth: 4,
            }
        },
        layout: {
            type: "dagre",
            rankdir: "TB",
            nodesep: 200,
            ranksep: 50
        },
        defaultEdge: {
            style: {
                stroke: "#ffb203",
                lineWidth: 3,
                endArrow: {
                    path: G6.Arrow.triangle(4, 4, 8),
                    d: 8
                }
            },
            edgeStateStyles: {
                highlight: {
                    stroke: "#ffb203",
                    lineWidth: 5
                },
                dark: {
                    stroke: "#ffb20333"
                }
            },
            curveOffset: 100
        }
    }
    const constructGraph = () => {
        const container = ReactDOM.findDOMNode(ref.current) as HTMLElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        let g = new G6.Graph({
            container,
            width,
            height,
            ...graphOpt
        });

        if (typeof window != "undefined") {
            window.onresize = () => {
                g.changeSize(container.clientWidth, container.clientHeight);
            }
        }
        appenAutoShapeListener(g);
        g.get('canvas').set('localRefresh', false);
        return g;
    }
    return <div className="topo-container" ref={ref}>
    </div>
}