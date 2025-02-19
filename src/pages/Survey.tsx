import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  Button, 
  Stepper, 
  Step, 
  StepLabel,
  TextField,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';

// Survey Question Interface
interface SurveyQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'rating';
  options?: string[];
}

// Mock Survey Questions
const surveyQuestions: SurveyQuestion[] = [
  {
    id: '1',
    question: 'چقدر از محصول ما راضی هستید؟',
    type: 'multiple-choice',
    options: ['بسیار ناراضی', 'ناراضی', 'متوسط', 'راضی', 'بسیار راضی']
  },
  {
    id: '2',
    question: 'چه پیشنهادی برای بهبود محصول دارید؟',
    type: 'text'
  },
  {
    id: '3',
    question: 'احتمال توصیه محصول به دوستان چقدر است؟',
    type: 'multiple-choice',
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  }
];

const Survey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleNext = () => {
    // Validate current step
    const currentQuestion = surveyQuestions[activeStep];
    if (!answers[currentQuestion.id]) {
      setOpenSnackbar(true);
      return;
    }

    if (activeStep < surveyQuestions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Survey completed
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    // In a real app, you would send this to a backend
    console.log('Survey Answers:', answers);
    alert('از شما برای شرکت در این نظرسنجی سپاسگزاریم!');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderQuestionInput = (question: SurveyQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{question.question}</FormLabel>
            <RadioGroup
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
            >
              {question.options?.map((option) => (
                <FormControlLabel 
                  key={option} 
                  value={option} 
                  control={<Radio />} 
                  label={option} 
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'text':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={question.question}
            variant="outlined"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          نظرسنجی
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {surveyQuestions.map((question) => (
            <Step key={question.id}>
              <StepLabel>{`سوال ${question.id}`}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 2 }}>
          {renderQuestionInput(surveyQuestions[activeStep])}
        </Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button 
              disabled={activeStep === 0} 
              onClick={handleBack}
              variant="outlined"
            >
              بازگشت
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNext}
            >
              {activeStep === surveyQuestions.length - 1 ? 'ثبت نهایی' : 'بعدی'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          لطفاً به سوال پاسخ دهید
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Survey;