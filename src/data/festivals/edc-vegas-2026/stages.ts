import { Stage } from "@/types";

export const stages: Stage[] = [
  {
    id: "kinetic-field",
    name: "Kinetic Field",
    x: 50,
    y: 12,
    color: "#FF00DD",
  },
  {
    id: "circuit-grounds",
    name: "Circuit Grounds",
    x: 63,
    y: 65,
    color: "#00FF66",
  },
  {
    id: "cosmic-meadow",
    name: "Cosmic Meadow",
    x: 22,
    y: 52,
    color: "#00CCFF",
  },
  {
    id: "basspod",
    name: "Basspod",
    x: 47,
    y: 78,
    color: "#FF3399",
  },
  {
    id: "neon-garden",
    name: "Neon Garden",
    x: 68,
    y: 52,
    color: "#99FF00",
  },
  {
    id: "quantum-valley",
    name: "Quantum Valley",
    x: 63,
    y: 30,
    color: "#CC99FF",
  },
  {
    id: "stereo-bloom",
    name: "Stereo Bloom",
    x: 30,
    y: 42,
    color: "#FF9933",
  },
  {
    id: "wasteland",
    name: "Wasteland",
    x: 22,
    y: 72,
    color: "#FF6633",
  },
  {
    id: "bionic-jungle",
    name: "Bionic Jungle",
    x: 13,
    y: 42,
    color: "#33FFCC",
  },
];

export const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));
