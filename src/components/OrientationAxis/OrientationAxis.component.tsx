import { useCanvas, useAnimation } from "../Canvas/Canvas.component";

export class OrientationAxisProps {
  beta?: number | null;
  gamma?: number | null;
  onDeviceAlignmentUpdated?: (deviceIsAligned: boolean) => void;
  alignmentErrorMargin?: number = 0.1; // 0 means that it requires perfect alignment, 1 is no alignment validation
}

export const OrientationAxis = ({ beta, gamma, onDeviceAlignmentUpdated, alignmentErrorMargin }: OrientationAxisProps) => {
  const context = useCanvas();

  var xOffset = 40;
  var yOffset = 40;
  var railWidth = 100;
  alignmentErrorMargin = alignmentErrorMargin || .1;

  var xCenterPosition = xOffset + (railWidth / 2);
  var yCenterPosition = yOffset + (railWidth / 2);

  var railEndingXPosition = xOffset + railWidth;
  var railEndingYPosition = yOffset + railWidth;

  var radius = 5;
  var gammaIsAligned = false;
  var betaIsAligned = false;

  // const circleXPosition = useAnimation<number>(
  //   xPosition,
  //   currentPosition => currentPosition
  // );

  function valueIsWithinThreshold(value: number, target: number, errorMargin: number): boolean {
    var lowerThreshold = target - (target * errorMargin);
    var upperThreshold = target + (target * errorMargin);
    return value >= lowerThreshold && value <= upperThreshold;
  }

  if (context !== null) {

    //Draw horizontal circle
    if (gamma) {
      gammaIsAligned = valueIsWithinThreshold((gamma + 90), 90, alignmentErrorMargin);
      context.beginPath();
      context.arc((((gamma + 90) / 180) * railWidth) + xOffset, yCenterPosition, radius, 0, 2 * Math.PI, false);
      context.fillStyle = gammaIsAligned ? 'green' : 'orange';
      context.fill();
    }

    //Draw vertical circle
    if (beta) {
      betaIsAligned = valueIsWithinThreshold(beta, 90, alignmentErrorMargin);
      context.beginPath();
      context.arc(xCenterPosition, ((beta / 180) * railWidth) + yOffset, radius, 0, 2 * Math.PI, false);
      context.fillStyle = betaIsAligned ? 'green' : 'orange';
      context.fill();
    }

    //Draw vertical rail
    context.beginPath();
    context.moveTo(xCenterPosition, yOffset);
    context.lineTo(xCenterPosition, railEndingYPosition);
    context.stroke();

    //Draw horizontal rail
    context.beginPath();
    context.moveTo(xOffset, yCenterPosition);
    context.lineTo(railEndingXPosition, yCenterPosition);
    context.stroke();

    if (onDeviceAlignmentUpdated) {
      onDeviceAlignmentUpdated(gammaIsAligned === true && betaIsAligned === true)
    }
  }

  return null;
};