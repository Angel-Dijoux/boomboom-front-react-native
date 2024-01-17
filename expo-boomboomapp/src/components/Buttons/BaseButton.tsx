import React, { ReactNode, useMemo } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { BaseButtonContent } from "./components/BaseButtonContent";
import { BaseButtonIcon } from "./components/BaseButtonIcon";
import useEStyle from "../../hooks/useEStyle";
import useEStyles from "../../hooks/useEStyles";
import { getEStyleSheetValue, styleSheetCompose } from "../../utils/styleUtils";
import { IconName } from "../Icons/IconName";

export enum BaseButtonTheme {
  CONTAINED = "Contained",
  OUTLINED = "Outlined",
  INLINE = "Inline",
}

export enum BaseButtonIconPosition {
  RIGHT = "Right",
  LEFT = "Left",
}

type ContentType = ReactNode;

export type BaseButtonProps = {
  color?: string;
  icon?: IconName;
  iconPosition?: BaseButtonIconPosition;
  theme?: BaseButtonTheme;
  content?: ContentType;
  contentBackground?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  noDefaultPadding?: boolean;
} & Omit<PressableProps, "style">;

export const BaseButton = ({
  theme = BaseButtonTheme.CONTAINED,
  color = "$primaryColor",
  content,
  contentBackground,
  icon,
  iconPosition = BaseButtonIconPosition.RIGHT,
  style: _style,
  textStyle,
  noDefaultPadding = false,
  ...props
}: BaseButtonProps): JSX.Element => {
  const styles = useEStyles({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonWithDefaultPadding: {
      paddingHorizontal: "$spacer2",
      paddingVertical: "$spacer2",
    },
    buttonContained: {
      backgroundColor: color,
      borderRadius: "$smallBorderRadius",
    },
    buttonOutlined: {
      borderColor: color,
      borderWidth: 1,
      borderRadius: "$smallBorderRadius",
    },
    buttonInline: {
      backgroundColor: "transparent",
    },
    buttonPressed: {
      opacity: 0.8,
    },
  });
  const style = useEStyle(_style);
  const iconColor = useMemo(() => {
    switch (theme) {
      case BaseButtonTheme.CONTAINED:
        return "$backgroundColor";
      case BaseButtonTheme.INLINE:
      case BaseButtonTheme.OUTLINED:
      default:
        return color;
    }
  }, [theme, color]);
  const iconSize =
    textStyle?.fontSize ?? getEStyleSheetValue<number>("$buttonIconFontSize");

  return (
    <Pressable
      {...props}
      style={({ pressed }): StyleProp<ViewStyle> =>
        styleSheetCompose(
          pressed && styles.buttonPressed,
          styles[`button${theme}`],
          style,
        )
      }
    >
      <View
        style={{
          ...(StyleSheet.absoluteFill as object),
          overflow: "hidden",
        }}
      >
        {contentBackground}
      </View>
      <View
        style={styleSheetCompose(
          styles.button,
          !noDefaultPadding && styles.buttonWithDefaultPadding,
        )}
      >
        {iconPosition === BaseButtonIconPosition.LEFT && (
          <BaseButtonIcon
            color={iconColor}
            icon={icon}
            iconPosition={iconPosition}
            size={iconSize}
            textStyle={textStyle}
            isContent={!!content}
          />
        )}
        <BaseButtonContent
          color={color}
          content={content}
          textStyle={textStyle}
          theme={theme}
        />
        {iconPosition === BaseButtonIconPosition.RIGHT && (
          <BaseButtonIcon
            color={iconColor}
            icon={icon}
            iconPosition={iconPosition}
            size={iconSize}
            textStyle={textStyle}
            isContent={!!content}
          />
        )}
      </View>
    </Pressable>
  );
};
