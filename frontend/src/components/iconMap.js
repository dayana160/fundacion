import {
  FaRunning, FaUsers, FaTrophy, FaHeart, FaFutbol, FaMedal, FaCalendarAlt,
  FaUserFriends, FaGraduationCap, FaHandHoldingHeart, FaDumbbell, FaShieldAlt,
  FaStar, FaChartLine, FaBullseye, FaBolt, FaGlobe, FaSmile,
} from 'react-icons/fa';

export const ICON_OPTIONS = [
  { value: 'FaRunning', label: 'Corredor', Icon: FaRunning },
  { value: 'FaUsers', label: 'Equipo / Valores', Icon: FaUsers },
  { value: 'FaTrophy', label: 'Trofeo', Icon: FaTrophy },
  { value: 'FaHeart', label: 'Corazón / Apoyo', Icon: FaHeart },
  { value: 'FaFutbol', label: 'Balón', Icon: FaFutbol },
  { value: 'FaMedal', label: 'Medalla', Icon: FaMedal },
  { value: 'FaCalendarAlt', label: 'Calendario', Icon: FaCalendarAlt },
  { value: 'FaUserFriends', label: 'Comunidad', Icon: FaUserFriends },
  { value: 'FaGraduationCap', label: 'Formación', Icon: FaGraduationCap },
  { value: 'FaHandHoldingHeart', label: 'Apoyo Integral', Icon: FaHandHoldingHeart },
  { value: 'FaDumbbell', label: 'Entrenamiento', Icon: FaDumbbell },
  { value: 'FaShieldAlt', label: 'Escudo', Icon: FaShieldAlt },
  { value: 'FaStar', label: 'Estrella', Icon: FaStar },
  { value: 'FaChartLine', label: 'Crecimiento', Icon: FaChartLine },
  { value: 'FaBullseye', label: 'Objetivo', Icon: FaBullseye },
  { value: 'FaBolt', label: 'Energía', Icon: FaBolt },
  { value: 'FaGlobe', label: 'Global', Icon: FaGlobe },
  { value: 'FaSmile', label: 'Bienestar', Icon: FaSmile },
];

export function getIconComponent(name) {
  const found = ICON_OPTIONS.find((o) => o.value === name);
  return found ? found.Icon : FaStar;
}
