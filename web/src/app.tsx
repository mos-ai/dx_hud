import ReactDOM from "react-dom";
import React, { useEffect, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useGeneralStore, onMessage, useCoordsStore, useHealthStore, useOxygenStore, useArmorStore, useStaminaStore, useVehicleStore, useSeatbeltStore, emitter } from "./logic/message";
import seatbeltIcon from "./images/seatbelt.svg";
{/* <i class=""></i> */}
// function InnerDisplay() {
//   return (<>
//     {[1, 2, 3, 4, 5].map((x) => (
//       [1,2,3].map((y) => (<div key={`b${x}${y}`} className={`b${x}${y} x${x} y${y}`}/>)
//     )))}
//   </>)
// }

// function NumericDisplay({style, value, color}: {style?: React.CSSProperties, value: string, color?: string}) {
//   if(value === "-") value = "minus";
//   if(value === ".") value = "dot";

//   return (<div style={style} className={`counter v${value} ${color || ""}`}>
//     <InnerDisplay/>
//   </div>);
// }

// function NumericRenderer({value, color, style}: {value: string | number, color?: string, style?: React.CSSProperties}) {
//   const vals = value.toString().split("");
//   return (
//     <>
//       {vals.map((val, index) => (
//         <NumericDisplay color={color} style={style} key={`v${index}`} value={val} />
//       ))}
//     </>
//   );
// }


function BarDisplay({pct, colour, label, suffix, value}: {pct: number, colour: string, label?: string, value?: string, suffix?: string}) {
  return (<Container fluid className="bar-display">
    <Row className="align-items-center no-gutters">
      {label && (<Col xs="auto" className="label">
        {`${label}: `}
      </Col>)}
      <Col xs="auto" className={`value colour-${colour}`}>
        {value || (pct * 100).toFixed(0)}
      </Col>
      {suffix && (<Col xs="auto" className="label">
        {`${suffix} `}
      </Col>)}
    </Row>
    <Row className="no-gutters">
      <Col xs="12">
        <div className={`bar-bg`}>
          <div className={`bar bg-${colour}`} style={{
            width: `${(pct * 100)}%`,
          }} />
        </div>
      </Col>
    </Row>
  </Container>);
}

function Coords() {
  const { coords } = useCoordsStore();
  // console.log("coords", JSON.stringify(coords));
  return (
    <Col xs={"auto"}>
      {`X: ${coords.x.toFixed(3)}`}<br/>
      {`Y: ${coords.y.toFixed(3)}`}<br/>
      {`Z: ${coords.z.toFixed(3)}`}
    </Col>
  );
}
// function Health() {
//   const { health } = useHealthStore();
//   let color = "green";
//   const pct = (health.current - 100) / (health.max - 100);
//   if(pct < 0.5) color = "yellow";
//   if(pct < 0.25) color = "red";
//   if(pct === 0) color = "black";
//   // console.log("health", health, color);
//   return (<BarDisplay pct={pct} colour={color} label="HP" />);
    
// }
// function Armor() {
//   const { armor } = useArmorStore();
//   if(!armor) return (<></>);
//   let color = "blue";
//   let pct =  (armor || 0) / 100;
//   if(pct < 0) pct = 0;
//   if(pct < 0.3) color = "red";
//   // if(pct === 0) color = "black";
//   return (<BarDisplay pct={pct} colour={color} label="AR" />);
// }

// function Oxygen() {
//   const { oxygen } = useOxygenStore();
//   if(!oxygen) return (<></>);
//   let pct = oxygen.current / oxygen.max;
//   if(pct < 0) pct = 0;
//   let color = "blue";
//   if(pct < 0.3) color = "red";
//   if(pct === 0) color = "black";

//   return (<BarDisplay pct={pct} colour={color} label="OX"/>);
// }
// function Stamina() {
//   const { stamina } = useStaminaStore();
//   let pct = stamina.current / stamina.max;
//   if(isNaN(pct) && stamina.current === stamina.max) pct = 1;
//   if(pct < 0) pct = 0;
//   let color = "green";
//   if(pct < 0.75) color = "yellow";
//   if(pct < 0.5) color = "orange";
//   if(pct < 0.3) color = "red";
//   if(pct === 0) color = "black";
//   return (<BarDisplay pct={pct} colour={color} label="ST"/>);
// }

function Vehicle() {
  const { vehicle } = useVehicleStore();
  const { seatbelt } = useSeatbeltStore();
  if(!vehicle) return (<></>);
  let speed = vehicle.speed.current * vehicle.unitsMultiplier;
  let maxSpeed = vehicle.speed.max * vehicle.unitsMultiplier;
  let percSpeed = (speed / maxSpeed);
  let colourSpeed = "green";
  if(percSpeed > 0.25) colourSpeed = "yellow";
  if(percSpeed > 0.5) colourSpeed = "orange";
  if(percSpeed > 0.9) colourSpeed = "red";

  
  let fuel = vehicle.fuel && vehicle.fuel / 100;

  let colourFuel = "green";
  if(fuel < 0.25) colourFuel = "red";
  if(fuel < 0.5) colourFuel = "orange";
  if(fuel < 0.75) colourFuel = "yellow";
  if(fuel === 0) colourFuel = "black";


  return (<Container fluid className="vehicle-display">
    <Row>
      <Col xs="auto">
        <BarDisplay suffix={"KM/H"} pct={percSpeed} colour={colourSpeed} value={`${speed.toFixed(0)}`} />
      </Col>
      <Col xs="auto">
        <BarDisplay pct={fuel} colour={colourFuel} label="FL" />
      </Col>
      <Col xs="auto">
        <div className={`seatbelt ${seatbelt ? "active" : "inactive"}`}>
          <svg  xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24">
            <path d="M12,2C13.11,2 14,2.9 14,4C14,5.11 13.11,6 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M12.39,14.79C14.03,14.79 15.46,14.89 16.64,15.04C16.7,12.32 16.46,9.92 16,9C15.87,8.73 15.69,8.5 15.5,8.3L7.43,15.22C8.79,15 10.5,14.79 12.39,14.79M7.46,17C7.59,18.74 7.85,20.5 8.27,22H10.34C10.05,21.12 9.84,20.09 9.68,19C9.68,19 12,18.56 14.32,19C14.16,20.09 13.95,21.12 13.66,22H15.73C16.17,20.45 16.43,18.61 16.56,16.79C15.41,16.65 14,16.54 12.39,16.54C10.46,16.54 8.78,16.75 7.46,17M12,7C12,7 9,7 8,9C7.66,9.68 7.44,11.15 7.37,12.96L13.92,7.34C12.93,7 12,7 12,7M18.57,5.67L17.43,4.34L13.92,7.35C14.47,7.54 15.05,7.84 15.5,8.3L18.57,5.67M20.67,15.83C20.58,15.8 19.14,15.33 16.64,15.04C16.63,15.61 16.6,16.2 16.56,16.79C18.81,17.07 20.1,17.5 20.12,17.5L20.67,15.83M7.37,12.96L3.43,16.34L4.32,17.82C4.34,17.81 5.5,17.36 7.46,17C7.35,15.59 7.32,14.2 7.37,12.96Z"/>
          </svg>
        </div>
      </Col>
    </Row>
  </Container>);
}

function MiniBar({icon, pct}: {icon: string, pct: number}) {
  let colour = "green";
  pct = isNaN(pct) ? 1 : pct;
  if(pct === 0) {
    colour = "black";
  } else if(pct < 0.25) {
     colour = "red";
  } else if(pct < 0.5) {
    colour = "orange";
  } else if(pct < 0.75) {
    colour = "yellow";
  }
  return (<Col xs="auto" className="">
    <Container fluid className={`mini-bar no-gutters`}>
      <Row className="align-items-center">
        <Col xs="auto" className="icon">
          <i className={icon} />
        </Col>
        <Col xs="auto">
          <div className={`bar ${colour}`}>
            <div className={`bar-inner bg-${colour}`} style={{
              width: `${(pct * 100).toFixed(2)}%`,
            }} />
            <div className="label">
              {`${(pct * 100).toFixed(0)}%`}            
            </div>
            
          </div>
        </Col>
      </Row>
    </Container>
  </Col>);
}
function MiniHealth() {
  const { health } = useHealthStore();
  let pct = (health.current - 100) / (health.max - 100);
  if(pct < 0) pct = 0;
  return (<MiniBar icon="fas fa-heartbeat" pct={pct} />);
}
function MiniStamina() {
  const { stamina } = useStaminaStore();
  let pct = stamina.current / stamina.max;
  if(pct < 0) pct = 0;
  return (<MiniBar icon="fas fa-running" pct={pct} />);
}
function MiniOxygen() {
  const { oxygen } = useOxygenStore();
  if(!oxygen) return (<></>);
  let pct = oxygen.current / oxygen.max;
  if(pct < 0) pct = 0;
  return (<MiniBar icon="fas fa-tint" pct={pct} />);
}
function MiniArmor() {
  const { armor } = useArmorStore();
  if(!armor) return (<></>);
  let pct =  (armor || 0) / 100;
  if(pct < 0) pct = 0;
  return (<MiniBar icon="fas fa-shield-alt" pct={pct} />);
}


function AudioHandler() {
  const buckleRef = useRef(null);
  const unbuckleRef = useRef(null);
  useEffect(() => {
    const playAudioFunc = (data) => {
      console.log("setSeatbelt", data);
      buckleRef.current.volume = 0.5;
      unbuckleRef.current.volume = 0.5;
      if(data) {
        // unbuckleRef.current.stop();
        buckleRef.current.play();
      } else {
        // buckleRef.current.stop();
        unbuckleRef.current.play();
      }
    };
    emitter.on("setSeatbelt", playAudioFunc)
    return () => {
      emitter.off("setSeatbelt", playAudioFunc);
    }
  })

  return (<>
    <audio ref={buckleRef} src="../assets/sounds/buckle.ogg" preload="preload" />
    <audio ref={unbuckleRef} src="../assets/sounds/unbuckle.ogg" preload="preload"/>
  </>);
}

function Main() {
  const { display } = useGeneralStore();

  return (
    <Container fluid className={`${display ? "" : "d-none"}`}>
      <AudioHandler />
      <Row
        style={{
          height: "100vh",
          fontSize: 16, color: "#fff", fontWeight: 400
        }}
      >
        <Col xs={12} className="align-self-start" >
          <Container fluid className="no-gutters">
            {/* <Row>
              <Col xs="auto" className={"top-left-bar"}>
                <Container fluid>
                  <Row>
                    <Col xs={"auto"}>
                      <Health />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={"auto"}>
                      <Stamina />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={"auto"}>
                      <Armor />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={"auto"}>
                      <Oxygen />
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col xs="auto" className="ms-auto">
                { <Container fluid >
                  <Row>
                    <Coords />
                  </Row>
                </Container> }
                
                <Vehicle />
              </Col>
            </Row> */}
          </Container>
        </Col>
        <Col xs={12} className="align-self-end bottom-bar">
          <div className="character">
            <Container fluid className="no-gutters">
              <Row>
                <MiniHealth/>
                <MiniStamina/>
                <MiniArmor/>
                <MiniOxygen />
                <Col xs="auto" className="align-self-center">
                  <Vehicle />
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

window.onload = (event) => {
  fetch(`https://${GetParentResourceName()}/nuiReady`);
  window.addEventListener('message', onMessage);
  ReactDOM.render(<Main />, document.getElementById("main"));
}


// console.log("hello world")
