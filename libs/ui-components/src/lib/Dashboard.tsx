import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'gold' | 'yellow';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    gold: 'bg-gold-50 text-gold-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-charcoal-gray">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export interface DashboardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg';
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  children,
  columns = 4,
  gap = 'md',
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };
  
  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
      {children}
    </div>
  );
};

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
}

export interface DashboardActivity {
  id: string | number;
  user: string;
  action: string;
  time: string;
}

export interface DashboardProps {
  stats: DashboardStat[];
  charts?: React.ReactNode;
  recentActivity?: DashboardActivity[];
  title?: string;
  subtitle?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  charts,
  recentActivity,
  title,
  subtitle,
}) => {
  // Helper to convert simple change string to trend object for StatCard
  const getTrend = (change?: string, type?: string) => {
    if (!change || !type || type === 'neutral') return undefined;
    const value = parseFloat(change.replace(/[^0-9.]/g, ''));
    return {
      value: isNaN(value) ? 0 : value,
      isPositive: type === 'increase',
    };
  };

  return (
    <div className="space-y-8">
      {(title || subtitle) && (
        <div>
          {title && <h1 className="text-3xl font-bold text-charcoal-gray">{title}</h1>}
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
      )}

      {/* Stats Grid */}
      <DashboardGrid columns={4}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.label}
            value={stat.value}
            trend={getTrend(stat.change, stat.changeType)}
            icon={stat.icon || (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            )}
            color={index % 2 === 0 ? 'blue' : 'green'} // Simple alternating colors for now
          />
        ))}
      </DashboardGrid>

      {/* Charts Section */}
      {charts && (
        <div className="mt-8">
          {charts}
        </div>
      )}

      {/* Recent Activity Section */}
      {recentActivity && recentActivity.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
