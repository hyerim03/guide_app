import mqtt from 'mqtt';
import { useEffect, useRef } from 'react';

let globalClient = null;

const useMqtt = () => {
  const clientRef = useRef();

  useEffect(() => {
    if (!globalClient) {
      globalClient = mqtt.connect('ws://192.168.10.146:9001', {
        clientId: 'guide_app_' + Math.random().toString(16).slice(2),
        keepalive: 30,
        clean: true,
        reconnectPeriod: 1000,
      });

      globalClient.on('error', msg => {
        console.log('mqtt event error', msg);
      });

      globalClient.on('connect', () => {
        console.log('connected');
      });

      globalClient.on('message', (topic, message) => {
        console.log(`${topic} 토픽에서 온 메세지: ${message}`);
      });
    }

    clientRef.current = globalClient;
  }, []);

  const publish = (topic, message) => {
    console.log('publish try:', {
      topic,
      message,
      connected: clientRef.current.connected,
    });
    if (clientRef.current?.connected) {
      clientRef.current.publish(topic, message);
    } else {
      console.log('mqtt not connected : publish');
    }
  };

  const subscribe = (topic, setState) => {
    console.log('subscribe connect state check:', {
      topic,
      connected: clientRef.current.connected,
    });
    if (clientRef.current?.connected) {
      clientRef.current.subscribe(topic, err => {
        if (!err) {
          console.log('subscribe', topic);
        }
      });
      globalClient.on('message', (topic, message) => {
        setState(message);
      });
    } else {
      console.log('mqtt not connect : subscribe');
    }
  };

  return { publish, subscribe };
};

export default useMqtt;
