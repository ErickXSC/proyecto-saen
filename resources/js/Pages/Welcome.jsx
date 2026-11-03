export default function Welcome({ mensaje }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    🏊 {mensaje}
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    Sistema Automatizado para Escuelas de Natación
                </p>
                <p style={{ marginTop: '2rem', opacity: 0.7 }}>
                    Laravel 13 + React + Inertia.js
                </p>
            </div>
        </div>
    );
}
