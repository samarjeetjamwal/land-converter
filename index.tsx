import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Helper function to format numbers, referenced as 'fmt' in the snippet
const fmt = (val: number | undefined) => {
    if (val === undefined || val === null) return '0';
    return val.toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

// Mock data for land unit conversion factors (Square Feet per unit)
const FACTORS: Record<string, Record<string, number>> = {
    'Standard': {
        'Sq. Ft': 1,
        'Sq. Meter': 10.764,
        'Acre': 43560,
        'Hectare': 107639
    },
    'Uttar Pradesh': {
        'Bigha': 27000,
        'Biswa': 1350
    },
    'Bihar': {
        'Bigha': 27220,
        'Katha': 1361
    },
    'West Bengal': {
        'Bigha': 14400,
        'Katha': 720
    }
};

export default function LandConverter() {
    // Define state variables to resolve 'Cannot find name' errors for compState1, compState2, etc.
    const [compState1, setCompState1] = useState<string>('Standard');
    const [compState2, setCompState2] = useState<string>('Uttar Pradesh');
    
    // State for selected units
    const [selectedFrom, setSelectedFrom] = useState<string>('Acre');
    const [selectedTo, setSelectedTo] = useState<string>('Bigha');
    
    const [amount, setAmount] = useState<number>(1);

    // Derived values for factors1 and factors2
    const factors1 = FACTORS[compState1] || {};
    const factors2 = FACTORS[compState2] || {};
    
    // Ensure compFrom and compTo are valid for the selected states
    const compFrom = factors1[selectedFrom] ? selectedFrom : Object.keys(factors1)[0];
    const compTo = factors2[selectedTo] ? selectedTo : Object.keys(factors2)[0];

    const val1 = factors1[compFrom] || 0;
    const val2 = factors2[compTo] || 1;
    
    // Calculate compResult
    const compResult = (amount * val1) / val2;

    // Placeholders for data1 and data2 referenced in the snippet
    const data1 = factors1;
    const data2 = factors2;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '2rem' }}>Land Unit Converter</h1>

            {/* Input Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>From</label>
                    <select 
                        value={compState1} 
                        onChange={(e) => setCompState1(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                    >
                        {Object.keys(FACTORS).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select 
                        value={compFrom} 
                        onChange={(e) => setSelectedFrom(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                    >
                        {Object.keys(factors1).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>

                <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>To</label>
                    <select 
                        value={compState2} 
                        onChange={(e) => setCompState2(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                    >
                        {Object.keys(FACTORS).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select 
                        value={compTo} 
                        onChange={(e) => setSelectedTo(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                    >
                        {Object.keys(factors2).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Amount</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    style={{ fontSize: '1.5rem', padding: '0.5rem', width: '150px', textAlign: 'center', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}
                />
            </div>

            {/* Provided JSX Snippet */}
            <div style={{ background: "#eff6ff", padding: "1.5rem", borderRadius: "0.75rem", textAlign: "center", border: "1px solid #bfdbfe" }}>
                <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.5rem" }}>Conversion Result</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1e40af", wordBreak: "break-all" }}>
                    {compResult === 0 ? "0" : compResult < 0.01 ? compResult.toExponential(4) : compResult.toLocaleString("en-IN", { maximumFractionDigits: 4 })}
                </div>
                <div style={{ color: "#64748b", marginTop: "0.5rem" }}>{compTo} (in {compState2 || "State B"})</div>
            </div>

            {compState1 && compState2 && (
                <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                        <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>1 {compFrom} ({compState1})</div>
                        <div style={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}>≈ {fmt(factors1[compFrom])} Sq. Ft</div>
                    </div>
                    <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                        <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>1 {compTo} ({compState2})</div>
                        <div style={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}>≈ {fmt(factors2[compTo])} Sq. Ft</div>
                    </div>
                </div>
            )}

            {(data1 || data2) && (
                <div className="split-view" style={{ marginTop: "1.5rem" }}>
                     <p style={{ textAlign: 'center', color: '#94a3b8' }}>Detailed breakdown available.</p>
                </div>
            )}
        </div>
    );
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<LandConverter />);
}
