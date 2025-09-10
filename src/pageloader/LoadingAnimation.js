import Head from 'next/head';
import Image from 'next/image';

export default function LoadingAnimation() {
    return (
        <div className="loading-container">
           

            <div className="kidney-loader">
                <Image src="/kidney.png" alt="Kidney" layout="fill" objectFit="contain" className="kidney-image" />
            </div>
            
            <div className="loading-text">Processing Medical Data</div>
            <div className="loading-subtitle">Please wait while we prepare your results</div>
            
            <div className="progress-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .loading-container {
                    text-align: center;
                    padding: 2rem;
                }

                .kidney-loader {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 2rem;
                    position: relative;
                }

                .kidney-image {
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }

                .loading-text {
                    color: white;
                    font-size: 1.2rem;
                    font-weight: 300;
                    margin-bottom: 0.5rem;
                    animation: fadeInOut 2s ease-in-out infinite;
                }

                .loading-subtitle {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                    font-weight: 300;
                }

                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                .progress-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    animation: dotPulse 1.5s ease-in-out infinite;
                }

                .dot:nth-child(1) { animation-delay: 0s; }
                .dot:nth-child(2) { animation-delay: 0.3s; }
                .dot:nth-child(3) { animation-delay: 0.6s; }

                @keyframes dotPulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.3);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}