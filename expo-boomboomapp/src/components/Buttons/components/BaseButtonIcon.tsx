import { TextStyle } from "react-native";

import useEStyles from "../../../hooks/useEStyles";
import BaseIcon from "../../Icons/BaseIcon";
import { IconName } from "../../Icons/IconName";
import { BaseButtonIconPosition } from "../BaseButton";

type BaseButtonIconProps = {
  size: number;
  icon?: IconName;
  iconPosition: BaseButtonIconPosition;
  color: string;
  textStyle?: TextStyle;
  isContent?: boolean;
};

export const BaseButtonIcon = ({
  icon,
  textStyle,
  color,
  size,
  iconPosition,
  isContent,
}: Readonly<BaseButtonIconProps>) => {
  const styles = useEStyles({
    iconLeft: {
      marginRight: "$spacer2",
    },
    iconRight: {
      marginLeft: "$spacer2",
    },
  });

  if (!icon) {
    return null;
  }
  return (
    <BaseIcon
      name={icon}
      color={textStyle?.color ?? color}
      size={size}
      style={isContent && styles[`icon${iconPosition}`]}
    />
  );
};
