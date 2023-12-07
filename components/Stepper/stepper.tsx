import React from 'react';
import Step from './step';

const styles = {
  root: {
    width: '100%',
    minHeight: 0,
    padding: 0,
  },
  stepper: {
    display: 'table',
    width: '100%',
    margin: '0 auto',
  },
};

interface StepInfo {
  title: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
}

interface StepperProps {
  activeStep?: number;
  steps: StepInfo[];
  disabledSteps?: number[];
  activeColor?: string;
  completeColor?: string;
  defaultColor?: string;
  circleFontColor?: string;
  activeTitleColor?: string;
  completeTitleColor?: string;
  defaultTitleColor?: string;
  size?: number;
  circleFontSize?: number;
  titleFontSize?: number;
  circleTop?: number;
  titleTop?: number;
  completeOpacity?: string;
  activeOpacity?: string;
  defaultOpacity?: string;
  completeTitleOpacity?: string;
  activeTitleOpacity?: string;
  defaultTitleOpacity?: string;
  barStyle?: string;
  defaultBorderColor?: string;
  completeBorderColor?: string;
  activeBorderColor?: string;
  defaultBorderStyle?: string;
  completeBorderStyle?: string;
  activeBorderStyle?: string;
  defaultBarColor?: string;
  completeBarColor?: string;
  lineMarginOffset?: number;
  defaultBorderWidth?: number;
}

const Stepper: React.FC<StepperProps> = ({
  activeStep = 0,
  steps,
  disabledSteps,
  activeColor = '#5096FF',
  completeColor = '#5096FF',
  defaultColor = '#E0E0E0',
  circleFontColor = '#FFF',
  activeTitleColor = '#000',
  completeTitleColor = '#000',
  defaultTitleColor = '#757575',
  size = 32,
  circleFontSize = 16,
  titleFontSize = 16,
  circleTop = 24,
  titleTop = 8,
  defaultBarColor = '#E0E0E0',
  barStyle = 'solid',
  lineMarginOffset = 4,
  defaultBorderWidth = 3,
  defaultOpacity,
  completeOpacity,
  activeOpacity,
  defaultTitleOpacity,
  completeTitleOpacity,
  activeBorderStyle,
  completeBorderStyle,
  defaultBorderStyle,
  activeBorderColor,
  completeBorderColor,
  defaultBorderColor,
  activeTitleOpacity,
  completeBarColor,
}) => {
  return (
    <div style={styles.root}>
      <div style={styles.stepper}>
        {steps.map((step, index) => (
          <Step
            key={index}
            width={100 / steps.length}
            title={step.title}
            icon={step.icon}
            href={step.href}
            onClick={step.onClick}
            active={
              !(disabledSteps || []).includes(index) && index === activeStep
            }
            completed={
              !(disabledSteps || []).includes(index) && index < activeStep
            }
            first={index === 0}
            isLast={index === steps.length - 1}
            index={index}
            activeColor={activeColor}
            completeColor={completeColor}
            defaultColor={defaultColor}
            circleFontColor={circleFontColor}
            activeTitleColor={activeTitleColor}
            completeTitleColor={completeTitleColor}
            defaultTitleColor={defaultTitleColor}
            size={size}
            circleFontSize={circleFontSize}
            titleFontSize={titleFontSize}
            circleTop={circleTop}
            titleTop={titleTop}
            defaultOpacity={defaultOpacity}
            completeOpacity={completeOpacity}
            activeOpacity={activeOpacity}
            defaultTitleOpacity={defaultTitleOpacity}
            completeTitleOpacity={completeTitleOpacity}
            activeTitleOpacity={activeTitleOpacity}
            barStyle={barStyle}
            defaultBorderColor={defaultBorderColor}
            completeBorderColor={completeBorderColor}
            activeBorderColor={activeBorderColor}
            defaultBorderStyle={defaultBorderStyle}
            defaultBorderWidth={defaultBorderWidth}
            completeBorderStyle={completeBorderStyle}
            activeBorderStyle={activeBorderStyle}
            defaultBarColor={defaultBarColor}
            completeBarColor={completeBarColor}
            lineMarginOffset={lineMarginOffset}
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
