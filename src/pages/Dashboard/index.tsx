/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import { WiBarometer } from 'react-icons/wi';
import { FaThermometerHalf } from 'react-icons/fa';
import { AiOutlineColumnHeight } from 'react-icons/ai';
import { ImArrowDownLeft, ImArrowRight, ImArrowUp } from 'react-icons/im';
import { IoIosWater } from 'react-icons/io';
import { Panel, Control, Container, Info, Header } from './styles';
import ThalesLogo from '../../assets/logo.png';
import api from '../../services/api';
import mqttClient from '../../services/mqttClient';

import MapWrapped from './mapConfig';

const Dashboard: React.FC = () => {
  const [id, setID] = useState('');
  const [temperature, setTemperature] = useState(10);
  const [humidity, setHumidity] = useState(10);
  const [pressure, setPressure] = useState(10);
  const [aceleX, setAceleX] = useState(10);
  const [aceleY, setAceleY] = useState(10);
  const [aceleZ, setAceleZ] = useState(10);
  const [giroX, setGiroX] = useState(10);
  const [giroY, setGiroY] = useState(10);
  const [giroZ, setGiroZ] = useState(10);
  const [magneX, setMagneX] = useState(10);
  const [magneY, setMagneY] = useState(10);
  const [magneZ, setMagneZ] = useState(10);
  const [lat, setLat] = useState(10);
  const [long, setLong] = useState(10);
  const [alt, setAlt] = useState(10);
  const [value, setValue] = useState(['']);

  useEffect(() => {
    const handleNewMessage = (topic: string, message: Buffer): void => {
      //setValue(Object.values(JSON.parse(message.toString())));
      setValue(message.toString().split(','));
    };

    mqttClient.on('message', handleNewMessage);
    api.get('Dados').then((response) => {
      if (response.data) {
        setID(value[0]);
        setTemperature(parseInt(value[1], 10));
        setHumidity(parseInt(value[3], 10));
        setPressure(parseInt(value[2], 10));
        setAceleX(parseFloat(parseFloat(value[4]).toFixed(3)));
        setAceleY(parseFloat(parseFloat(value[5]).toFixed(3)));
        setAceleZ(parseFloat(parseFloat(value[6]).toFixed(3)));
        setGiroX(parseFloat(parseFloat(value[7]).toFixed(3)));
        setGiroY(parseFloat(parseFloat(value[8]).toFixed(3)));
        setGiroZ(parseFloat(parseFloat(value[9]).toFixed(3)));
        setAlt(parseInt(value[10], 10));
        setMagneX(parseFloat(parseFloat(value[11]).toFixed(3)));
        setMagneY(parseFloat(parseFloat(value[12]).toFixed(3)));
        setMagneZ(parseFloat(parseFloat(value[13]).toFixed(3)));
        setLat(parseFloat(parseFloat(value[14]).toFixed(3)));
        setLong(parseFloat(parseFloat(value[15]).toFixed(3)));
      }
    });
  }, [value]);

  return (
    <>
      <Container>
        <Header>
          <strong> ID: {id}</strong>
        </Header>
        <div id="logo">
          <img src={ThalesLogo} alt="Thales" />
        </div>
        <Panel>
          <strong id="title">Temperatura</strong>
          <Control>
            <Info>
              <div id="icon">
                <FaThermometerHalf size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {temperature}°C</strong>
                  <p>Temperatura</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Umidade</strong>
          <Control>
            <Info>
              <div id="icon">
                <IoIosWater size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {humidity}%</strong>
                  <p>Umidade</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Pressão</strong>
          <Control>
            <Info>
              <div id="icon">
                <WiBarometer size={50} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{pressure} Pa</strong>
                  <p>Pressão</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Altitude</strong>
          <Control>
            <Info>
              <div id="icon">
                <AiOutlineColumnHeight size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {alt} m</strong>
                  <p>Altitude</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Acelerômetro</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {aceleX} g</strong>
                  <p>Aceleração X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {aceleY} g</strong>
                  <p>Aceleração Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{aceleZ} g</strong>
                  <p>Aceleração Z</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Giroscópio</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {giroX}°/s</strong>
                  <p>Giroscópio X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {giroY}°/s</strong>
                  <p>Giroscópio Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{giroZ}°/s</strong>
                  <p>Giroscópio Z</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Magnetômetro</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {magneX} Br</strong>
                  <p>Magnetômetro X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {magneY} Br</strong>
                  <p>Magnetômetro Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{magneZ} Br</strong>
                  <p>Magnetômetro Z</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">GPS</strong>
          <Control>
            <Info>
              <div style={{ width: "50vw", height: "50vh" }}>
                <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrBoYeKQizI3lyp4OBYiHShkDLEv_S0NU`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </Info>
          </Control>
        </Panel>
      </Container>
    </>
  );
};

export default Dashboard;
