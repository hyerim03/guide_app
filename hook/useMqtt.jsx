import mqtt from 'mqtt';
import { useEffect, useRef } from 'react';

let globalClient = null;

const useMqtt = (url = 'ws://192.168.10.128:9001') => {
  const clientRef = useRef();

  useEffect(() => {
    if (!globalClient) {
      globalClient = mqtt.connect(url, {
        clientId: 'guide_app_' + Math.random().toString(16).slice(2),
        keepalive: 30,
        clean: true,
        reconnectPeriod: 1000,
      });

      globalClient.on('error', msg => {
        console.log('mqtt event error', msg);
      });

      globalClient.on('connect', () => {
        console.log('connect');
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
      clientRef.current.publish(topic, message, { retain: false, qos: 0 });
    } else {
      console.log('mqtt not connected : publish');
    }
  };

  const subscribe = (topic, callback) => {
    const doSubscribe = () => {
      clientRef.current.subscribe(topic, err => {
        if (!err) console.log('subscribe', topic);
      });
      clientRef.current.on('message', (t, message) => {
        if (t === topic) callback(message.toString());
      });
    };

    if (clientRef.current?.connected) {
      doSubscribe();
    } else {
      clientRef.current.once('connect', doSubscribe);
    }
  };

  return { publish, subscribe };
};

export default useMqtt;
