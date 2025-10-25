import React from 'react';
import RevenueChart from './components/RevenueChart';
import RegistrationChart from './components/RegistrationChart';
import SMSActivity from './components/SMSActivity';
import { RevenueTrend, RegistrationTrend } from '@/types';

interface RealChartsProps {
    revenueData: RevenueTrend[];
    registrationData: RegistrationTrend[];
    smsData: Record<string, number>;
}

const RealCharts: React.FC<RealChartsProps> = ({
    revenueData,
    registrationData,
    smsData
}) => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Analytics Trends</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevenueChart data={revenueData} />
                <RegistrationChart data={registrationData} />
            </div>

            <SMSActivity data={smsData} />
        </div>
    );
};

export default RealCharts;
