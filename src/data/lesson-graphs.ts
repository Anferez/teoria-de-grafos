type Point = readonly [number, number]

export type Edge = {
  from: string
  to: string
  weight?: number
  label?: Point
}

export type LessonGraph = {
  vertices: readonly string[]
  points: Readonly<Record<string, Point>>
  edges: readonly Edge[]
  directed?: boolean
  alternative?: Readonly<Record<string, Point>>
  addedEdge?: Edge
  removable?: readonly string[]
}

const four = ['A', 'B', 'C', 'D']
const five = [...four, 'E']
const three = ['A', 'B', 'C']
const six = [...five, 'F']

function edge(from: string, to: string, weight?: number, label?: Point): Edge {
  return { from, to, weight, label }
}

const chain: LessonGraph = {
  vertices: three,
  points: { A: [62, 150], B: [220, 150], C: [378, 150] },
  edges: [edge('A', 'B'), edge('B', 'C')],
}

const square: LessonGraph = {
  vertices: four,
  points: { A: [151, 66], B: [342, 66], C: [342, 233], D: [151, 233] },
  edges: [edge('A', 'B'), edge('B', 'C'), edge('C', 'D'), edge('D', 'A')],
}

export const lessonGraphs = {
  basics: {
    vertices: four,
    points: { A: [68, 69], B: [215, 54], C: [190, 218], D: [371, 181] },
    edges: [edge('A', 'B'), edge('A', 'C'), edge('B', 'C'), edge('C', 'D')],
    addedEdge: edge('B', 'B'),
  },
  eulerSquare: square,
  eulerOpen: {
    vertices: five,
    points: { ...square.points, E: [53, 66] },
    edges: [...square.edges, edge('A', 'E')],
  },
  eulerStar: {
    vertices: four,
    points: { A: [220, 149], B: [90, 69], C: [350, 69], D: [220, 243] },
    edges: [edge('A', 'B'), edge('A', 'C'), edge('A', 'D')],
  },
  eulerDirected: {
    vertices: four,
    points: { A: [220, 146], B: [77, 65], C: [77, 235], D: [368, 146] },
    edges: [edge('A', 'B'), edge('B', 'C'), edge('C', 'A'), edge('A', 'D'), edge('D', 'A')],
    directed: true,
  },
  dirac: {
    vertices: six,
    points: { A: [220, 39], B: [351, 91], C: [351, 208], D: [220, 260], E: [89, 208], F: [89, 91] },
    edges: [edge('A', 'B'), edge('B', 'C'), edge('C', 'D'), edge('D', 'E'), edge('E', 'F'), edge('F', 'A'), edge('A', 'D'), edge('B', 'E'), edge('C', 'F')],
    removable: ['AD', 'BE', 'CF'],
  },
  doubleTriangle: {
    vertices: five,
    points: { A: [63, 65], B: [63, 235], C: [220, 150], D: [377, 65], E: [377, 235] },
    edges: [edge('A', 'B'), edge('B', 'C'), edge('C', 'A'), edge('C', 'D'), edge('D', 'E'), edge('E', 'C')],
  },
  digraph: {
    vertices: four,
    points: { A: [75, 62], B: [356, 62], C: [214, 110], D: [361, 247] },
    edges: [edge('A', 'B'), edge('A', 'C'), edge('C', 'B'), edge('B', 'D'), edge('D', 'A')],
    directed: true,
  },
  plane: {
    vertices: four,
    points: { A: [84, 52], B: [350, 52], C: [350, 242], D: [84, 242] },
    edges: [edge('A', 'B'), edge('B', 'C'), edge('C', 'D'), edge('D', 'A'), edge('A', 'C')],
  },
  complete: {
    vertices: four,
    points: { A: [67, 54], B: [367, 54], C: [367, 244], D: [67, 244] },
    alternative: { A: [67, 54], B: [367, 54], C: [367, 244], D: [250, 114] },
    edges: [edge('A', 'B'), edge('A', 'C'), edge('A', 'D'), edge('B', 'C'), edge('B', 'D'), edge('C', 'D')],
  },
  weighted: {
    vertices: four,
    points: { A: [61, 150], B: [220, 48], C: [220, 251], D: [379, 150] },
    edges: [
      edge('A', 'B', 5, [140, 83]), edge('A', 'C', 2, [140, 217]),
      edge('B', 'C', 1, [239, 149]), edge('B', 'D', 3, [300, 83]), edge('C', 'D', 8, [300, 217]),
    ],
  },
  tree: {
    vertices: six,
    points: { A: [220, 48], B: [131, 130], C: [316, 130], D: [65, 236], E: [185, 236], F: [351, 236] },
    edges: [edge('A', 'B'), edge('A', 'C'), edge('B', 'D'), edge('B', 'E'), edge('C', 'F')],
    addedEdge: edge('D', 'E'),
  },
  chain,
  directedChain: { ...chain, directed: true },
  delivery: {
    vertices: five,
    points: { A: [40, 140], B: [182, 49], C: [156, 235], D: [303, 188], E: [400, 75] },
    edges: [
      edge('A', 'B', 4, [108, 81]), edge('A', 'C', 2, [94, 207]),
      edge('C', 'B', 1, [149, 137]), edge('B', 'D', 3, [261, 109]),
      edge('C', 'D', 7, [229, 230]), edge('D', 'E', 2, [366, 145]), edge('B', 'E', 9, [293, 48]),
    ],
    directed: true,
  },
  school: {
    vertices: six,
    points: { A: [40, 150], B: [124, 63], C: [124, 237], D: [316, 63], E: [316, 237], F: [400, 150] },
    edges: [edge('A', 'B'), edge('A', 'C'), edge('B', 'C'), edge('B', 'D'), edge('C', 'E'), edge('D', 'E'), edge('D', 'F'), edge('E', 'F')],
    removable: ['BC', 'DE', 'DF'],
  },
} satisfies Record<string, LessonGraph>

export type GraphName = keyof typeof lessonGraphs

export function edgeKey({ from, to }: Edge) {
  return from + to
}

export function isRemoved(graph: LessonGraph, edge: Edge) {
  return graph.removable?.includes(edgeKey(edge)) ?? false
}

export function findEdge(graph: LessonGraph, from: string, to: string) {
  return graph.edges.find(edge =>
    (edge.from === from && edge.to === to)
    || (!graph.directed && edge.from === to && edge.to === from),
  )
}
