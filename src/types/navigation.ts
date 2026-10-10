import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  badge?: string;
}
