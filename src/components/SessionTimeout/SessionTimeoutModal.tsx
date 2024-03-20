"use client";
import React from 'react';

const SessionTimeoutModal: React.FC = () => {
    return (
        <div className="session-timeout-modal">
            <h2>Session Timeout</h2>
            <p>You've been logged out due to inactivity.</p>
        </div>
    );
};

export default SessionTimeoutModal;