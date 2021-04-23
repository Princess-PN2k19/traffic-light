import "./App.css";
import { useMachine } from "@xstate/react";
import trafficLightMachine from "./traffic-light";

function Road() {
  // eslint-disable-next-line
  const [light, send] = useMachine(trafficLightMachine);

  return (
    <div className="container">
      <div className="traffic">
        <div className="circle">
          {light.matches("red") ? (
            <div className="circle red"></div>
          ) : (
            <div className="circle redOff"></div>
          )}
        </div>
        <div className="circle">
          {light.matches("green") ? (
            <div className="circle green"></div>
          ) : (
            <div className="circle greenOff"></div>
          )}
        </div>
        <div className="circle">
          {light.matches("yellow") ? (
            <div className="circle yellow"></div>
          ) : (
            <div className="circle yellowOff"></div>
          )}
        </div>
        <div className="trafficTimer">
          {light.matches("red") ? (
            <h1 className="redTimer">{light.context.redTimer}</h1>
          ) : light.matches("green") ? (
            <h1 className="greenTimer">{light.context.greenTimer}</h1>
          ) : (
            <h1 className="yellowTimer">{light.context.yellowTimer}</h1>
          )}
        </div>
      </div>
      <div className="pedestrian">
        <div className="humanIcon">
          {light.matches("red") ? (
            <i className="fas fa-male walk" />
          ) : light.matches("green") ? (
            <i className="fas fa-male wait" />
          ) : (
            <i className="fas fa-male wait" />
          )}
        </div>
        <div className="humanTimer">
        <h1 className={light.matches("red")? "greenTimer": "redTimer"}>{light.context.pedestrianTimer}</h1>
        </div>
      </div>
    </div>
  );
}

export default Road;
