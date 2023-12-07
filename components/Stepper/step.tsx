import React from 'react';

interface StepProps {
  width: number;
  activeColor?: string;
  completeColor?: string;
  defaultColor?: string;
  activeTitleColor?: string;
  completeTitleColor?: string;
  defaultTitleColor?: string;
  circleFontColor?: string;
  size?: number;
  circleFontSize?: number;
  titleFontSize?: number;
  circleTop?: number;
  titleTop?: number;
  title?: string;
  icon?: string;
  index?: number;
  active?: boolean;
  completed?: boolean;
  first?: boolean;
  isLast?: boolean;
  completeOpacity?: string;
  activeOpacity?: string;
  defaultOpacity?: string;
  completeTitleOpacity?: string;
  activeTitleOpacity?: string;
  defaultTitleOpacity?: string;
  barStyle?: string;
  borderStyle?: string;
  defaultBarColor?: string;
  completeBarColor?: string;
  defaultBorderColor?: string;
  completeBorderColor?: string;
  activeBorderColor?: string;
  defaultBorderStyle?: string;
  completeBorderStyle?: string;
  activeBorderStyle?: string;
  lineMarginOffset?: number;
  defaultBorderWidth?: number;
  href?: string;
  onClick?: () => void;
}

const Step: React.FC<StepProps> = ({
  width,
  activeColor = '#5096FF',
  completeColor = '#5096FF',
  defaultColor = '#E0E0E0',
  activeTitleColor = '#000',
  completeTitleColor = '#000',
  defaultTitleColor = '#757575',
  circleFontColor = '#FFF',
  size = 32,
  circleFontSize = 16,
  titleFontSize = 16,
  circleTop = 24,
  titleTop = 8,
  defaultBarColor = '#E0E0E0',
  barStyle = 'solid',
  lineMarginOffset = 4,
  defaultBorderWidth = 3,
  completeOpacity,
  activeOpacity,
  defaultOpacity,
  completeTitleOpacity,
  activeTitleOpacity,
  defaultTitleOpacity,
  completeBarColor,
  defaultBorderColor,
  completeBorderColor,
  activeBorderColor,
  defaultBorderStyle,
  completeBorderStyle,
  activeBorderStyle,
  title,
  icon,
  index,
  active,
  completed,
  first,
  isLast,
  href,
  onClick,
}) => {
  const getStyles = () => {
    // ... (same as your existing getStyles function)

    return {
      step: {
        width: `${width}%`,
        display: 'table-cell',
        position: 'relative',
        paddingTop: circleTop,
      },
      circle: {
        width: size,
        height: size,
        margin: '0 auto',
        backgroundColor: defaultColor,
        borderRadius: '50%',
        textAlign: 'center',
        padding: 1,
        fontSize: circleFontSize,
        color: circleFontColor,
        display: 'block',
        opacity: defaultOpacity,
        borderWidth: defaultBorderColor ? defaultBorderWidth : 0,
        borderColor: defaultBorderColor,
        borderStyle: defaultBorderStyle,
      },
      activeCircle: {
        backgroundColor: activeColor,
        opacity: activeOpacity,
        borderWidth: activeBorderColor ? defaultBorderWidth : 0,
        borderColor: activeBorderColor,
        borderStyle: activeBorderStyle,
      },
      completedCircle: {
        backgroundColor: completeColor,
        opacity: completeOpacity,
        borderWidth: completeBorderColor ? defaultBorderWidth : 0,
        borderColor: completeBorderColor,
        borderStyle: completeBorderStyle,
      },
      index: {
        lineHeight: `${size + circleFontSize / 4}px`,
        color: circleFontColor,
      },
      title: {
        marginTop: titleTop,
        fontSize: titleFontSize,
        fontWeight: '300',
        textAlign: 'center',
        display: 'block',
        color: defaultTitleColor,
        opacity: defaultTitleOpacity,
      },
      activeTitle: {
        color: activeTitleColor,
        opacity: activeTitleOpacity,
      },
      completedTitle: {
        color: completeTitleColor,
        opacity: completeTitleOpacity,
      },
      leftBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: 1,
        borderTopColor: defaultBarColor,
        left: 0,
        right: '50%',
        marginRight: size / 2 + lineMarginOffset,
        opacity: defaultOpacity,
      },
      rightBar: {
        position: 'absolute',
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: 1,
        borderTopColor: defaultBarColor,
        right: 0,
        left: '50%',
        marginLeft: size / 2 + lineMarginOffset,
        opacity: defaultOpacity,
      },
      completedBar: {
        borderTopStyle: barStyle,
        borderTopWidth: 1,
        borderTopColor: completeBarColor,
        opacity: completeOpacity,
      },
    };
  };

  const styles = getStyles();
  const circleStyle = Object.assign(
    styles.circle,
    completed ? styles.completedCircle : {},
    active ? styles.activeCircle : {}
  );
  const titleStyle = Object.assign(
    styles.title,
    completed ? styles.completedTitle : {},
    active ? styles.activeTitle : {}
  );
  const leftStyle = Object.assign(
    styles.leftBar,
    active || completed ? styles.completedBar : {}
  );
  const rightStyle = Object.assign(
    styles.rightBar,
    completed ? styles.completedBar : {}
  );

  const stepContent = icon ? (
    <img src={icon} alt={index + 1 + ''} />
  ) : (
    index + 1
  );

  return (
    <div style={styles.step}>
      <div style={circleStyle}>
        {active || completed ? (
          <a href={href} onClick={onClick} style={styles.index}>
            {stepContent}
          </a>
        ) : (
          <span style={styles.index}>{stepContent}</span>
        )}
      </div>
      {active || completed ? (
        <a href={href} onClick={onClick} style={titleStyle}>
          {title}
        </a>
      ) : (
        <div style={titleStyle}>{title}</div>
      )}
      {!first && <div style={leftStyle}></div>}
      {!isLast && <div style={rightStyle}></div>}
    </div>
  );
};

export default Step;
