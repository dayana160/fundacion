import React from 'react';
import { FaInbox } from 'react-icons/fa';

export function Loader() {
  return (
    <div className="loader-wrap">
      <div className="spinner" />
    </div>
  );
}

export function EmptyState({ message = 'No hay información disponible todavía.', icon = true, admin = false }) {
  return (
    <div className={admin ? 'admin-empty' : 'empty-state'}>
      {icon && <FaInbox />}
      <p>{message}</p>
    </div>
  );
}
