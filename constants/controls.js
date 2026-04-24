import {
  Warehouse,
  Factory,
  Home,
  UtensilsCrossed,
  Thermometer,
  Droplets,
  Sun,
  LogOut,
} from 'lucide-react-native';
import { COLORS } from './colors';

export const SELECT_LIST = [
  {
    id: 'logistics',
    title: '물류',
    subtitle: '환경',
    icon: Warehouse,
    color: COLORS.accent,
  },
  {
    id: 'production',
    title: '생산',
    subtitle: '환경',
    icon: Factory,
    color: COLORS.accent,
  },
  {
    id: 'home',
    title: '가정',
    subtitle: '환경',
    icon: Home,
    color: COLORS.accent,
  },
  {
    id: 'restaurant',
    title: '식당',
    subtitle: '환경',
    icon: UtensilsCrossed,
    color: COLORS.accent,
  },
];

export const CONTROL_LIST = [
  {
    id: 'temperature',
    title: '온도',
    subtitle: '제어',
    icon: Thermometer,
    color: '#EF4444',
  },
  {
    id: 'humidity',
    title: '습도',
    subtitle: '제어',
    icon: Droplets,
    color: '#3B82F6',
  },
  {
    id: 'brightness',
    title: '조도',
    subtitle: '제어',
    icon: Sun,
    color: '#EAB308',
  },
  {
    id: 'end',
    title: '시연',
    subtitle: '종료',
    icon: LogOut,
    color: '#6B7280',
  },
];

export const CONTROL_CONFIGS = {
  temperature: { label: '온도', unit: '°C', min: 16,   max: 40,   initial: 24,  accentColor: '#EF4444', format: 'number', visualStyle: 'thermometer' },
  humidity:    { label: '습도', unit: '%',  min: 0,    max: 100,  initial: 50,  accentColor: '#3B82F6', format: 'number', visualStyle: 'waterlevel'  },
  brightness:  { label: '조도', unit: '',   min: 0,    max: 1439, initial: 720, accentColor: '#EAB308', format: 'time',   visualStyle: 'glow'        },
};
