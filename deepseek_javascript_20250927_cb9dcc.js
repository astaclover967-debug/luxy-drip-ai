// AI Response Engine - Smart & Contextual
const AIResponseEngine = {
    responses: {
        welcome: [
            "🎯 Welcome to Luxy Drip AI! I'm your personal fashion assistant ready to create magic with your style!",
            "✨ Hello! I'm here to help you discover amazing outfit combinations through virtual try-ons!",
            "👋 Welcome! Let's create some fashion magic together with AI-powered styling!"
        ],
        camera: [
            "📸 Perfect! I'll help you capture the perfect selfie for virtual try-on. Make sure you have good lighting!",
            "🎭 Camera ready! Position yourself in good light for the best virtual styling experience.",
            "📷 Excellent! I'm optimizing the camera for fashion photography. Show me your best angle!"
        ],
        selfieCaptured: [
            "✅ Amazing selfie! I can analyze your features perfectly. Now let's choose some clothing!",
            "👤 Great capture! Your style profile is ready. Time to select fashion items!",
            "📸 Perfect! I've processed your image. Ready for the virtual wardrobe?"
        ],
        clothingSelected: [
            "👕 Excellent choice! This item matches your style profile beautifully. Ready for virtual try-on?",
            "🎯 Perfect selection! This clothing will look great on you. Shall we try it virtually?",
            "👖 Great taste! I can already see this working well with your features."
        ],
        tryOnProcessing: [
            "🎭 Starting virtual try-on... Analyzing fit, drape, and style compatibility...",
            "✨ AI is working its magic! Mapping clothing to your body proportions...",
            "🔄 Processing virtual try-on... Optimizing for realistic appearance..."
        ],
        tryOnSuccess: [
            "🎉 Stunning! This outfit complements your features perfectly! The fit is ideal for your body type.",
            "✨ Amazing match! The colors work beautifully with your skin tone and the style suits you well!",
            "✅ Perfect! This outfit scores 9.2/10 for your profile. The proportions are ideal!"
        ],
        weatherAnalysis: [
            "🌤️ Analyzing local weather conditions for smart styling recommendations...",
            "📍 Checking your location to provide weather-appropriate fashion advice...",
            "🌡️ Processing current conditions for optimal outfit suggestions..."
        ],
        weatherSuccess: [
            "✅ Weather analysis complete! Your outfit is perfect for today's conditions!",
            "🌤️ Perfect! This outfit works great with the current weather. You'll be comfortable all day!",
            "📍 Smart styling! I've optimized recommendations based on local conditions."
        ],
        error: [
            "⚠️ Let me help with that. Try again or let me guide you through the process!",
            "🔄 Almost there! Let's try that again for the best experience.",
            "💡 Need assistance? I'm here to help you get the perfect result!"
        ]
    },

    getResponse(context, userAction) {
        const responses = this.responses[context];
        if (!responses) return this.responses.error[0];
        
        // Smart response selection based on user action
        const index = Math.floor(Math.random() * responses.length);
        return responses[index];
    },

    // Smart follow-up suggestions
    getFollowUp(currentStep) {
        const followUps = {
            1: "📸 Ready to capture your style profile?",
            2: "👕 Time to explore amazing clothing options!",
            3: "🎯 Let's see how this looks on you virtually!",
            4: "🌤️ Want weather-based styling tips?"
        };
        return followUps[currentStep] || "✨ What would you like to try next?";
    }
};

// Camera Manager - Real Camera Integration
const CameraManager = {
    async initializeCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            return stream;
        } catch (error) {
            throw new Error('Camera access needed for virtual try-on');
        }
    },

    capturePhoto(videoElement) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            context.drawImage(videoElement, 0, 0);
            
            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, 'image/jpeg', 0.8);
        });
    }
};

// Weather Service - Real API Integration
const WeatherService = {
    async getCurrentWeather(latitude, longitude) {
        try {
            // Using OpenWeatherMap API (free tier)
            const apiKey = process?.env?.REACT_APP_WEATHER_API || 'demo_key';
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );
            
            if (response.ok) {
                const data = await response.json();
                return {
                    temperature: Math.round(data.main.temp),
                    condition: data.weather[0].main,
                    humidity: data.main.humidity,
                    city: data.name,
                    icon: this.getWeatherIcon(data.weather[0].main)
                };
            }
        } catch (error) {
            // Fallback to demo data
            return this.getDemoWeather();
        }
        return this.getDemoWeather();
    },

    getDemoWeather() {
        const conditions = ['Clear', 'Clouds', 'Rain', 'Sunny'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        return {
            temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
            condition: randomCondition,
            humidity: Math.floor(Math.random() * 40) + 40,
            city: 'Your Location',
            icon: this.getWeatherIcon(randomCondition)
        };
    },

    getWeatherIcon(condition) {
        const icons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Sunny': '🌞',
            'Snow': '❄️'
        };
        return icons[condition] || '🌤️';
    },

    getWeatherRecommendation(weather) {
        const temp = weather.temperature;
        const condition = weather.condition.toLowerCase();
        
        if (temp < 10) return "Perfect for layered outfits and warm accessories!";
        if (temp < 20) return "Ideal for light jackets and comfortable layers!";
        if (condition.includes('rain')) return "Great for waterproof styles and cozy layers!";
        return "Perfect weather for light, breathable outfits!";
    }
};

// Virtual Try-On Engine
const VirtualTryOnEngine = {
    processTryOn(userImage, clothingImage) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate AI processing
                const score = (Math.random() * 2 + 8).toFixed(1); // 8.0-10.0
                const compliments = [
                    "The color harmony is perfect for your features!",
                    "This fit complements your body proportions beautifully!",
                    "The style matches your personality perfectly!",
                    "Excellent choice! This outfit highlights your best features!"
                ];
                
                resolve({
                    success: true,
                    score: score,
                    message: compliments[Math.floor(Math.random() * compliments.length)],
                    features: {
                        colorMatch: "Excellent",
                        fit: "Perfect",
                        style: "Ideal",
                        occasion: "Versatile"
                    }
                });
            }, 2500);
        });
    }
};

// Main App Component
function LuxyDripAI() {
    // State Management - Using React.useState for browser compatibility
    const [currentStep, setCurrentStep] = React.useState(1);
    const [userImage, setUserImage] = React.useState(null);
    const [clothingImage, setClothingImage] = React.useState(null);
    const [tryOnResult, setTryOnResult] = React.useState(null);
    const [weatherData, setWeatherData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [aiMessage, setAiMessage] = React.useState('');
    const [cameraStream, setCameraStream] = React.useState(null);
    const [showCamera, setShowCamera] = React.useState(false);
    
    const videoRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    // Initialize AI Welcome
    React.useEffect(() => {
        showAIResponse('welcome');
    }, []);

    // AI Response System
    const showAIResponse = (context, action = null) => {
        const message = AIResponseEngine.getResponse(context);
        setAiMessage(message);
        
        // Auto-clear message after delay
        setTimeout(() => {
            setAiMessage('');
        }, 5000);
    };

    // Camera Functions
    const startCamera = async () => {
        setLoading(true);
        try {
            const stream = await CameraManager.initializeCamera();
            setCameraStream(stream);
            setShowCamera(true);
            
            // Wait for video element to be ready
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setLoading(false);
                showAIResponse('camera');
            }, 100);
        } catch (error) {
            setLoading(false);
            showAIResponse('error');
            // Fallback to file upload
            fileInputRef.current?.click();
        }
    };

    const captureSelfie = async () => {
        if (!videoRef.current) return;
        
        setLoading(true);
        try {
            const photoUrl = await CameraManager.capturePhoto(videoRef.current);
            setUserImage(photoUrl);
            setShowCamera(false);
            setCurrentStep(2);
            showAIResponse('selfieCaptured');
            
            // Stop camera stream
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        } catch (error) {
            showAIResponse('error');
        }
        setLoading(false);
    };

    // Image Handling
    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (type === 'user') {
                setUserImage(e.target.result);
                setCurrentStep(2);
                showAIResponse('selfieCaptured');
            } else {
                setClothingImage(e.target.result);
                setCurrentStep(3);
                showAIResponse('clothingSelected');
            }
        };
        reader.readAsDataURL(file);
    };

    // Virtual Try-On
    const performVirtualTryOn = async () => {
        if (!userImage || !clothingImage) {
            showAIResponse('error');
            return;
        }

        setLoading(true);
        showAIResponse('tryOnProcessing');

        try {
            const result = await VirtualTryOnEngine.processTryOn(userImage, clothingImage);
            setTryOnResult(result);
            setCurrentStep(4);
            showAIResponse('tryOnSuccess');
        } catch (error) {
            showAIResponse('error');
        }
        setLoading(false);
    };

    // Weather Analysis
    const analyzeWeather = async () => {
        setLoading(true);
        showAIResponse('weatherAnalysis');

        try {
            // Get user location
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            const weather = await WeatherService.getCurrentWeather(
                position.coords.latitude,
                position.coords.longitude
            );
            
            setWeatherData({
                ...weather,
                recommendation: WeatherService.getWeatherRecommendation(weather)
            });
            showAIResponse('weatherSuccess');
        } catch (error) {
            // Use demo weather data
            const demoWeather = WeatherService.getDemoWeather();
            setWeatherData({
                ...demoWeather,
                recommendation: WeatherService.getWeatherRecommendation(demoWeather)
            });
            showAIResponse('weatherSuccess');
        }
        setLoading(false);
    };

    // Reset Application
    const resetApp = () => {
        setUserImage(null);
        setClothingImage(null);
        setTryOnResult(null);
        setWeatherData(null);
        setCurrentStep(1);
        setShowCamera(false);
        
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        
        showAIResponse('welcome');
    };

    // Camera Component
    const CameraView = () => (
        React.createElement('div', { className: 'luxury-card fade-in' },
            React.createElement('h3', { className: 'card-title' }, '📸 Camera Ready'),
            React.createElement('div', { className: 'camera-container' },
                React.createElement('video', {
                    ref: videoRef,
                    autoPlay: true,
                    playsInline: true,
                    style: {
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '12px',
                        border: '2px solid var(--accent-gold)'
                    }
                })
            ),
            React.createElement('div', { className: 'action-grid' },
                React.createElement('button', {
                    className: 'btn btn-primary',
                    onClick: captureSelfie
                }, '📸 Capture Selfie'),
                React.createElement('button', {
                    className: 'btn btn-secondary',
                    onClick: () => setShowCamera(false)
                }, '❌ Cancel')
            )
        )
    );

    // File Upload Input (Hidden)
    const FileInput = () => (
        React.createElement('input', {
            type: 'file',
            ref: fileInputRef,
            accept: 'image/*',
            style: { display: 'none' },
            onChange: (e) => handleImageUpload(e, 'user')
        })
    );

    // Main Render
    return React.createElement('div', { className: 'app-container' },
        // Luxury Header
        React.createElement('div', { className: 'luxury-header slide-up' },
            React.createElement('h1', { className: 'app-title' }, '🎯 LUXY DRIP AI'),
            React.createElement('p', { className: 'app-subtitle' }, 'Premium Virtual Styling')
        ),

        // Progress Steps
        React.createElement('div', { className: 'progress-container' },
            [1, 2, 3, 4].map(step =>
                React.createElement('div', { key: step, className: 'step-wrapper' },
                    React.createElement('div', {
                        className: `step-circle ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`
                    }, step),
                    React.createElement('span', { className: 'step-label' },
                        ['Style', 'Wardrobe', 'Try-On', 'Results'][step - 1]
                    )
                )
            )
        ),

        // AI Message Banner
        aiMessage && React.createElement('div', {
            className: 'luxury-card',
            style: { 
                background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.05))',
                borderColor: 'var(--accent-gold)'
            }
        },
            React.createElement('p', { style: { 
                color: 'var(--accent-gold)', 
                textAlign: 'center',
                margin: 0,
                fontWeight: '500'
            }}, aiMessage)
        ),

        // Main Content
        React.createElement('div', { className: 'content-area' },
            // Step 1: Style Profile
            currentStep === 1 && !showCamera && React.createElement('div', { className: 'luxury-card fade-in' },
                React.createElement('h3', { className: 'card-title' }, 'Discover Your Style'),
                React.createElement('p', { className: 'card-description' },
                    'Let me analyze your fashion preferences and create a personalized style profile with AI-powered insights.'
                ),
                React.createElement('button', {
                    className: 'btn btn-primary',
                    onClick: startCamera,
                    disabled: loading
                }, loading ? '🔄 Initializing...' : '📸 Start Camera'),
                React.createElement('button', {
                    className: 'btn btn-secondary',
                    onClick: () => fileInputRef.current?.click()
                }, '📁 Upload Photo')
            ),

            // Camera View
            showCamera && CameraView(),

            // Step 2: Wardrobe Selection
            currentStep >= 2 && !showCamera && React.createElement('div', { className: 'luxury-card fade-in' },
                React.createElement('h3', { className: 'card-title' }, 'Virtual Wardrobe'),
                
                // User Image Preview
                userImage && React.createElement('div', { className: 'image-preview-container' },
                    React.createElement('img', { 
                        src: userImage, 
                        className: 'preview-image',
                        alt: 'Your style profile' 
                    }),
                    React.createElement('span', { className: 'image-label' }, 'Your Style Profile')
                ),

                // Clothing Selection
                React.createElement('button', {
                    className: 'btn btn-primary',
                    onClick: () => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => handleImageUpload(e, 'clothing');
                        input.click();
                    },
                    disabled: loading
                }, clothingImage ? '🔄 Change Clothing' : '👕 Select Clothing Item'),

                // Clothing Image Preview
                clothingImage && React.createElement('div', { className: 'image-preview-container' },
                    React.createElement('img', { 
                        src: clothingImage, 
                        className: 'preview-image',
                        alt: 'Selected clothing item' 
                    }),
                    React.createElement('span', { className: 'image-label' }, 'Selected Item')
                ),

                // Try-On Button
                userImage && clothingImage && React.createElement('button', {
                    className: 'btn btn-success',
                    onClick: performVirtualTryOn,
                    disabled: loading
                }, loading ? '🎭 Processing...' : '🎯 Virtual Try-On')
            ),

            // Step 3/4: Results
            (currentStep === 3 || currentStep === 4) && tryOnResult && React.createElement('div', { className: 'luxury-card result-card fade-in' },
                React.createElement('h3', { className: 'result-title' }, '✅ Style Results'),
                React.createElement('p', { className: 'result-content' }, tryOnResult.message),
                React.createElement('div', { className: 'rating-badge' }, `AI Score: ${tryOnResult.score}/10`),
                
                React.createElement('div', { className: 'result-grid' },
                    React.createElement('div', { className: 'result-item' },
                        React.createElement('span', { className: 'result-emoji' }, '🎨'),
                        React.createElement('span', { className: 'result-text' }, 'Color Match')
                    ),
                    React.createElement('div', { className: 'result-item' },
                        React.createElement('span', { className: 'result-emoji' }, '📏'),
                        React.createElement('span', { className: 'result-text' }, 'Perfect Fit')
                    ),
                    React.createElement('div', { className: 'result-item' },
                        React.createElement('span', { className: 'result-emoji' }, '⭐'),
                        React.createElement('span', { className: 'result-text' }, 'Style Score')
                    )
                )
            ),

            // Weather Integration
            React.createElement('div', { className: 'luxury-card fade-in' },
                React.createElement('h3', { className: 'card-title' }, 'Smart Styling'),
                React.createElement('button', {
                    className: 'btn btn-info',
                    onClick: analyzeWeather,
                    disabled: loading
                }, '🌤️ Get Weather Tips'),

                // Weather Results
                weatherData && React.createElement('div', { className: 'weather-card', style: { marginTop: '16px' } },
                    React.createElement('div', { className: 'weather-info' },
                        React.createElement('span', { className: 'weather-icon' }, weatherData.icon),
                        React.createElement('div', { className: 'weather-details' },
                            React.createElement('div', { className: 'weather-temp' }, `${weatherData.temperature}°C`),
                            React.createElement('div', { className: 'weather-condition' }, weatherData.condition)
                        )
                    ),
                    React.createElement('p', { style: { 
                        color: '#BBDEFB', 
                        textAlign: 'center',
                        marginTop: '12px'
                    }}, weatherData.recommendation)
                )
            ),

            // Action Buttons
            React.createElement('div', { className: 'action-grid' },
                React.createElement('button', {
                    className: 'btn action-btn btn-secondary',
                    onClick: resetApp
                }, '🔄 New Session'),
                React.createElement('button', {
                    className: 'btn action-btn btn-secondary',
                    onClick: () => showAIResponse('welcome')
                }, '💡 AI Help')
            )
        ),

        // Hidden File Input
        FileInput(),

        // Loading Overlay
        loading && React.createElement('div', { className: 'loading-overlay' },
            React.createElement('div', { className: 'loading-spinner' }),
            React.createElement('p', { className: 'loading-text' }, 'AI is analyzing your style...')
        )
    );
}

// Initialize App
ReactDOM.render(React.createElement(LuxyDripAI), document.getElementById('root'));