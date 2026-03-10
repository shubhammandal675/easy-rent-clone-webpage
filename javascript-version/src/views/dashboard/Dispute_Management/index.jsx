'use client'
import React, { useState, useEffect } from 'react'
import DisputeList from './DisputeList'
import DisputeView from './DisputeView'

const DisputeManagement = () => {
    const [view, setView] = useState('list');
    const [selectedDispute, setSelectedDispute] = useState(null);

    // Refresh persistence logic
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedView = sessionStorage.getItem('dispute_view');
            const savedData = sessionStorage.getItem('dispute_data');
            if (savedView === 'view' && savedData) {
                setView('view');
                setSelectedDispute(JSON.parse(savedData));
            }
        }
    }, []);

    const handleViewDetail = (dispute) => {
        sessionStorage.setItem('dispute_view', 'view');
        sessionStorage.setItem('dispute_data', JSON.stringify(dispute));
        setSelectedDispute(dispute);
        setView('view');
    };

    const handleBack = () => {
        sessionStorage.removeItem('dispute_view');
        sessionStorage.removeItem('dispute_data');
        setView('list');
        setSelectedDispute(null);
    };

    return (
        <>
            {view === 'list' ? (
                <DisputeList onView={handleViewDetail} />
            ) : (
                <DisputeView data={selectedDispute} onBack={handleBack} />
            )}
        </>
    );
}

export default DisputeManagement;