import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

export interface DataNode extends SimulationNodeDatum {
  id: number;
  r: number;
}

export interface DataLink extends SimulationLinkDatum<DataNode> {
}

export interface GraphData {
  nodes: DataNode[];
  links: DataLink[];
  progress: number;
}
