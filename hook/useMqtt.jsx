import mqtt from 'mqtt';
import { useEffect, useRef } from 'react';

const useMqtt = () => {
  const clientRef = useRef();

  useEffect(() => {
    const client = mqtt.connect('ws://192.168.10.122:9001', {
      clientId: 'guide_app_' + Math.random().toString(16).slice(2),
      keepalive: 30,
      clean: true,
      reconnectPeriod: 1000,
    });

    clientRef.current = client;

    client.on('closed', () => {
      console.log('mqtt event closed');
    });

    client.on('error', msg => {
      console.log('mqtt event error', msg);
    });

    client.on('connect', () => {
      console.log('connected');
    });
    return () => {
      client.end(true);
    };
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

  const subscribe = topic => {
    if (clientRef.current?.connected) {
      clientRef.current.subscribe(topic);
    } else {
      console.lof('mqtt not connect : subscribe');
    }
  };

  return { publish, subscribe };
};

export default useMqtt;
