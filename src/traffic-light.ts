import { Machine, assign } from "xstate";

const TrafficLightMachine = Machine(
  {
    id: "traffic_light",
    initial: "red",
    context: {
      redTimer: 20,
      greenTimer: 15,
      yellowTimer: 5,
      pedestrianTimer: 20,
    },

    invoke: {
      id: "timer",
      src: "timer",
    },
    states: {
      red: {
        entry: "resetPedestrianTimer",
        on: {
          TICK: [
            {
              cond: "redDoneCond",
              target: "green",
              actions: ["resetRedTimer", "resetPedestrianTimer"],
            },
            {
              actions: ["redCountdown", "pedestrianCountdown"],
            },
          ],
        },
      },
      green: {
        entry: ["assignPedestrianTimer"],
        on: {
          TICK: [
            {
              cond: "greenDoneCond",
              target: "yellow",
              actions: ["resetGreenTimer","pedestrianCountdown"],
            },
            {
              actions: ["greenCountdown", "pedestrianCountdown"],
            },
          ],
        },
      },
      yellow: {
        on: {
          TICK: [
            {
              cond: "yellowDoneCond",
              target: "red",
              actions: "resetYellowTimer",
            },
            {
              actions: ["yellowCountdown", "pedestrianCountdown"],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      redCountdown: assign({
        redTimer: ({ redTimer }, event) => (redTimer -= 1),
      }),
      pedestrianCountdown: assign({
        pedestrianTimer: ({ pedestrianTimer }, event) => (pedestrianTimer -= 1),
      }),
      greenCountdown: assign({
        greenTimer: ({ greenTimer }, event) => (greenTimer -= 1),
      }),
      yellowCountdown: assign({
        yellowTimer: ({ yellowTimer }, event) => (yellowTimer -= 1),
      }),
      resetRedTimer: assign({ redTimer: (context, event) => 20 }),
      resetPedestrianTimer: assign({
        pedestrianTimer: (context, event) => 20,
      }),
      resetGreenTimer: assign({ greenTimer: (context, event) => 15 }),
      resetYellowTimer: assign({ yellowTimer: (context, event) => 5 }),
      assignPedestrianTimer: assign({
        pedestrianTimer: (context) => context.greenTimer + context.yellowTimer,
      }),
    },
    services: {
      timer: (context, event) => (send) => {
        setInterval(() => send("TICK"), 1000);
      },
    },
    guards: {
      redDoneCond: ({ redTimer }: any, event) => redTimer === 1,
      greenDoneCond: ({ greenTimer }: any, event) => greenTimer === 1,
      yellowDoneCond: ({ yellowTimer }: any, event) => yellowTimer === 1,
    },
  }
);

export default TrafficLightMachine;
