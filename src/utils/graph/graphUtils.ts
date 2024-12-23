
// types.ts
export interface XYPoint {
  x: number;
  y: number;
}

export interface Segment {
  name: string; // Assuming segments have a name
  value: number;
}

export type GraphData = XYPoint[] | Segment[];



export class GraphUtils {
    static isXYData(data: GraphData): data is XYPoint[] {
        return (data as XYPoint[]).every(point => 'x' in point && 'y' in point);
    }

    static getMin(data: XYPoint[], key: 'x' | 'y'): number {
        return Math.min(...data.map(point => point[key]));
    }

    static getMax(data: XYPoint[], key: 'x' | 'y'): number {
        return Math.max(...data.map(point => point[key]));
    }

    static getTotal(data: Segment[]): number {
        return data.reduce((acc, segment) => acc + segment.value, 0);
    }
}

