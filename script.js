        document.addEventListener('DOMContentLoaded', function() {
      const questions = [
        {
            id: 1,
            text: "In KNN, the value of k determines:",
            options: [
                "The number of training samples",
                "The number of nearest neighbors to consider",
                "The number of features in the dataset",
                "The number of classes in the target variable"
            ],
            correctAnswer: "The number of nearest neighbors to consider"
        },
        {
            id: 2,
            text: "Which distance metric is commonly used in KNN?",
            options: [
                "Manhattan distance",
                "Euclidean distance",
                "Mahalanobis distance",
                "Pearson correlation coefficient"
            ],
            correctAnswer: "Euclidean distance"
        },
        {
            id: 3,
            text: "How does KNN make predictions for classification tasks?",
            options: [
                "By averaging the labels of the k nearest neighbors",
                "By fitting a linear regression line to the neighbors",
                "By calculating the centroid of the neighbors",
                "By comparing the distances to a predefined threshold"
            ],
            correctAnswer: "By averaging the labels of the k nearest neighbors"
        },
        {
            id: 4,
            text: "How does the choice of k affect the bias and variance of the KNN model?",
            options: [
                "Increasing k increases bias and decreases variance",
                "Increasing k decreases bias and increases variance",
                "Increasing k has no effect on bias and variance",
                "The relationship between k and bias/variance is not well-defined"
            ],
            correctAnswer: "Increasing k increases bias and decreases variance"
        },
        {
            id: 5,
            text: "What is the main drawback of the KNN algorithm?",
            options: [
                "It requires large amounts of computational resources",
                "It is sensitive to outliers in the dataset",
                "It cannot handle categorical variables",
                "It is prone to overfitting"
            ],
            correctAnswer: "It requires large amounts of computational resources"
        }
    ];

            let currentQuestionIndex = 0;
            let answers = {};

            const totalQuestions = questions.length;
            const questionText = document.getElementById('question-text');
            const optionsContainer = document.getElementById('options-container');
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            const currentQuestionNumber = document.getElementById('current-question-number');
            const previousQuestionContainer = document.getElementById('previous-question-container');
            const previousQuestionText = document.getElementById('previous-question-text');
            const previousAnswerText = document.getElementById('previous-answer-text');
            const nextQuestionContainer = document.getElementById('next-question-container');
            const nextQuestionText = document.getElementById('next-question-text');
            const previousButton = document.getElementById('previous-button');
            const nextButton = document.getElementById('next-button');
            const submitButton = document.getElementById('submit-button');
            const questionNavButtons = document.getElementById('question-nav-buttons').children;

            function renderQuestion() {
                const question = questions[currentQuestionIndex];
                questionText.textContent = question.text;
                currentQuestionNumber.textContent = currentQuestionIndex + 1;
                progressText.textContent = `${currentQuestionIndex + 1} of ${totalQuestions}`;
                progressFill.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;

                // Render options
                optionsContainer.innerHTML = '';
                question.options.forEach((option, index) => {
                    const label = document.createElement('label');
                    label.className = 'flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition';
                    label.innerHTML = `
                        <input type="radio" name="q${question.id}" value="${option}" ${answers[question.id] === option ? 'checked' : ''}>
                        <div>
                            <p class="text-gray-800">${option}</p>
                        </div>
                    `;
                    optionsContainer.appendChild(label);
                });

                // Update previous question
                if (currentQuestionIndex > 0) {
                    const prevQuestion = questions[currentQuestionIndex - 1];
                    previousQuestionContainer.style.display = 'block';
                    previousQuestionText.textContent = prevQuestion.text;
                    previousAnswerText.textContent = answers[prevQuestion.id] || 'Not answered';
                } else {
                    previousQuestionContainer.style.display = 'none';
                }

                // Update next question
                if (currentQuestionIndex < totalQuestions - 1) {
                    nextQuestionContainer.style.display = 'block';
                    nextQuestionText.textContent = questions[currentQuestionIndex + 1].text;
                } else {
                    nextQuestionContainer.style.display = 'none';
                }

                // Update buttons
                previousButton.disabled = currentQuestionIndex === 0;
                nextButton.style.display = currentQuestionIndex === totalQuestions - 1 ? 'none' : 'flex';
                submitButton.style.display = currentQuestionIndex === totalQuestions - 1 ? 'block' : 'none';

                // Update navigation buttons
                Array.from(questionNavButtons).forEach((btn, index) => {
                    btn.className = `w-10 h-10 rounded-full ${index <= currentQuestionIndex ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} flex items-center justify-center font-medium`;
                });
            }

            function saveAnswer() {
                const selectedOption = document.querySelector(`input[name="q${questions[currentQuestionIndex].id}"]:checked`);
                if (selectedOption) {
                    answers[questions[currentQuestionIndex].id] = selectedOption.value;
                }
            }

            nextButton.addEventListener('click', () => {
                saveAnswer();
                if (currentQuestionIndex < totalQuestions - 1) {
                    currentQuestionIndex++;
                    renderQuestion();
                }
            });

            previousButton.addEventListener('click', () => {
                saveAnswer();
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                }
            });

            submitButton.addEventListener('click', () => {
                saveAnswer();
                alert('Test submitted! Your answers have been recorded.');
                console.log('Submitted answers:', answers);
            });

            // Camera functionality
            const videoElement = document.getElementById('video-stream');
            const startCameraButton = document.getElementById('start-camera');
            const toggleCameraButton = document.getElementById('toggle-camera');
            const cameraPlaceholder = document.getElementById('camera-placeholder');
            let stream = null;
            let cameraActive = false;

            startCameraButton.addEventListener('click', startCamera);
            toggleCameraButton.addEventListener('click', toggleCamera);

            function startCamera() {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(function(mediaStream) {
                            stream = mediaStream;
                            videoElement.srcObject = mediaStream;
                            cameraActive = true;
                            cameraPlaceholder.style.display = 'none';
                            toggleCameraButton.innerHTML = '<div class="w-7 h-7 flex items-center justify-center"><i class="ri-camera-off-line"></i></div>';
                        })
                        .catch(function(error) {
                            console.error('Could not access camera: ', error);
                            alert('Cannot access the camera. Please check privacy settings.');
                        });
                } else {
                    alert('Your browser does not support camera access.');
                }
            }

            function toggleCamera() {
                if (cameraActive) {
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                    }
                    videoElement.srcObject = null;
                    cameraActive = false;
                    cameraPlaceholder.style.display = 'flex';
                    toggleCameraButton.innerHTML = '<div class="w-7 h-7 flex items-center justify-center"><i class="ri-camera-line"></i></div>';
                } else {
                    startCamera();
                }
            }

            // Initialize
            renderQuestion();
        });