import React from 'react';
import { getIconComponent } from '../iconMap';

export default function FeatureCard({ icon, title, description, color = 'navy' }) {
  const Icon = getIconComponent(icon);
  return (
    <div className="feature-card">
      <div className={`feature-icon ${color}`}>
        <Icon />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
