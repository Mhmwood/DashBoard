import { Text } from "@/components";
import { Col, ColorPickerProps, ColorPicker as Picker, Row, Spin } from "antd";
import { cyan, green, presetPalettes, red, blue } from "@ant-design/colors";
import { SignatureFilled } from "@ant-design/icons";
import { useState } from "react";
import { useColor } from "@/context/ThemContext";
import { AggregationColor } from "antd/es/color-picker/color";

type Presets = Required<ColorPickerProps>["presets"][number];

export const ColorPicker = () => {
  const { color, setColor } = useColor();
  const [loading, setLoading] = useState(false);

  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors,
    }));

  const presets = genPresets({
    blue,
    red,
    green,
    cyan,
  });

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } },
  ) => (
    <Row justify="space-between" align="middle" wrap={false}>
      <Col flex="auto">
        <Presets />
      </Col>
      <Col span={8}>
        <Picker />
      </Col>
    </Row>
  );

  const handleColorChange = (_: AggregationColor, colorValue: string) => {
    setLoading(true);
    setColor(colorValue);
    setLoading(false);
  };

  return (
    <>
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={10}>
          <Picker
            defaultValue={color}
            showText={() => <Text strong>Button Color</Text>}
            size="large"
            presets={presets}
            panelRender={customPanelRender}
            onChange={handleColorChange}
            open
            aria-label="Color Picker"
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <SignatureFilled
              style={{
                color: color,
                fontSize: "12rem",
                transition: "color 0.3s ease-in-out",
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
